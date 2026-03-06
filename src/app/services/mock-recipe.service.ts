import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { MOCK_RECIPES } from '../data/mock-recipes';

@Injectable({
  providedIn: 'root'
})
export class MockRecipeService {
  private recipes: Recipe[] = MOCK_RECIPES;

  searchRecipes(query: string): Recipe[] {
    if (!query.trim()) {
      return [];
    }

    const searchTerm = query.toLowerCase();
    return this.recipes.filter(recipe => 
      recipe.title.toLowerCase().includes(searchTerm) ||
      recipe.summary?.toLowerCase().includes(searchTerm) ||
      recipe.cuisines?.some(c => c.toLowerCase().includes(searchTerm)) ||
      recipe.dishTypes?.some(d => d.toLowerCase().includes(searchTerm))
    );
  }

  getRecipeById(id: number): Recipe | undefined {
    return this.recipes.find(recipe => recipe.id === id);
  }

  getRandomRecipes(count: number = 12): Recipe[] {
    const shuffled = [...this.recipes].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, shuffled.length));
  }

  getAllRecipes(): Recipe[] {
    return [...this.recipes];
  }
}
