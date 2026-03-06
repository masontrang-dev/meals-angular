import { Injectable, signal, inject, computed } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Recipe } from '../models/recipe.model';
import { CustomRecipe } from '../models/custom-recipe.model';
import { environment } from '../../environments/environment';
import { MockRecipeService } from './mock-recipe.service';
import { CustomRecipeStorageService } from './custom-recipe-storage.service';

interface SpoonacularSearchResponse {
  results: Recipe[];
  offset: number;
  number: number;
  totalResults: number;
}

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private readonly http = inject(HttpClient);
  private readonly mockRecipeService = inject(MockRecipeService);
  private readonly customRecipeStorage = inject(CustomRecipeStorageService);
  private readonly baseUrl = environment.spoonacularBaseUrl;
  private readonly apiKey = environment.spoonacularApiKey;

  readonly recipes = signal<Recipe[]>([]);
  readonly customRecipes = signal<CustomRecipe[]>([]);
  readonly selectedRecipe = signal<Recipe | null>(null);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly usingFallback = signal(false);

  readonly allRecipes = computed(() => [
    ...this.customRecipes(),
    ...this.recipes()
  ]);

  constructor() {
    this.loadCustomRecipes();
  }

  async searchRecipes(query: string): Promise<void> {
    if (!query.trim()) {
      this.recipes.set([]);
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    try {
      const params = new HttpParams()
        .set('query', query)
        .set('apiKey', this.apiKey)
        .set('addRecipeInformation', 'true')
        .set('number', '12');

      const response = await this.http
        .get<SpoonacularSearchResponse>(`${this.baseUrl}/recipes/complexSearch`, { params })
        .toPromise();

      this.recipes.set(response?.results || []);
      this.usingFallback.set(false);
    } catch (err: any) {
      console.warn('Spoonacular API error, using fallback database:', err);
      
      const fallbackRecipes = this.mockRecipeService.searchRecipes(query);
      this.recipes.set(fallbackRecipes);
      this.usingFallback.set(true);
      
      if (err?.status === 402 || err?.error?.message?.includes('quota')) {
        this.error.set('API quota exceeded. Using local recipe database.');
      } else {
        this.error.set('Using local recipe database.');
      }
    } finally {
      this.loading.set(false);
    }
  }

  async getRecipeDetails(id: number): Promise<void> {
    this.loading.set(true);
    this.error.set(null);

    try {
      const params = new HttpParams()
        .set('apiKey', this.apiKey)
        .set('includeNutrition', 'true');

      const recipe = await this.http
        .get<Recipe>(`${this.baseUrl}/recipes/${id}/information`, { params })
        .toPromise();

      this.selectedRecipe.set(recipe || null);
      this.usingFallback.set(false);
    } catch (err: any) {
      console.warn('Spoonacular API error, using fallback database:', err);
      
      const fallbackRecipe = this.mockRecipeService.getRecipeById(id);
      this.selectedRecipe.set(fallbackRecipe || null);
      this.usingFallback.set(true);
      
      if (err?.status === 402 || err?.error?.message?.includes('quota')) {
        this.error.set('API quota exceeded. Using local recipe database.');
      } else {
        this.error.set('Using local recipe database.');
      }
    } finally {
      this.loading.set(false);
    }
  }

  async getRandomRecipes(): Promise<void> {
    this.loading.set(true);
    this.error.set(null);

    try {
      const params = new HttpParams()
        .set('apiKey', this.apiKey)
        .set('number', '12');

      const response = await this.http
        .get<{ recipes: Recipe[] }>(`${this.baseUrl}/recipes/random`, { params })
        .toPromise();

      this.recipes.set(response?.recipes || []);
      this.usingFallback.set(false);
    } catch (err: any) {
      console.warn('Spoonacular API error, using fallback database:', err);
      
      const fallbackRecipes = this.mockRecipeService.getRandomRecipes(12);
      this.recipes.set(fallbackRecipes);
      this.usingFallback.set(true);
      
      if (err?.status === 402 || err?.error?.message?.includes('quota')) {
        this.error.set('API quota exceeded. Using local recipe database.');
      } else {
        this.error.set('Using local recipe database.');
      }
    } finally {
      this.loading.set(false);
    }
  }

  clearSelectedRecipe(): void {
    this.selectedRecipe.set(null);
  }

  clearError(): void {
    this.error.set(null);
  }

  async loadCustomRecipes(): Promise<void> {
    try {
      const custom = await this.customRecipeStorage.getAllRecipes();
      this.customRecipes.set(custom);
    } catch (err) {
      console.error('Failed to load custom recipes:', err);
    }
  }

  async deleteCustomRecipe(id: number): Promise<void> {
    try {
      await this.customRecipeStorage.deleteRecipe(id);
      await this.loadCustomRecipes();
    } catch (err) {
      console.error('Failed to delete custom recipe:', err);
      throw err;
    }
  }

  isCustomRecipe(recipe: Recipe): recipe is CustomRecipe {
    return 'isCustom' in recipe && recipe.isCustom === true;
  }
}
