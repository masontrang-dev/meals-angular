import { Component, input, output, signal, inject, ChangeDetectionStrategy, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Recipe } from '../../models/recipe.model';
import { DayOfWeek, MealType } from '../../models/meal-plan.model';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-inline-recipe-search',
  templateUrl: './inline-recipe-search.component.html',
  styleUrl: './inline-recipe-search.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule]
})
export class InlineRecipeSearchComponent {
  day = input.required<DayOfWeek>();
  mealType = input.required<MealType>();
  
  recipeSelected = output<Recipe>();
  recipeClicked = output<{ recipe: Recipe; day: DayOfWeek; mealType: MealType }>();
  cancelled = output<void>();
  
  searchQuery = signal('');
  searchResults = signal<Recipe[]>([]);
  isSearching = signal(false);
  
  private readonly recipeService = inject(RecipeService);
  private searchTimeout: any = null;

  constructor() {
    effect(() => {
      const query = this.searchQuery();
      this.onSearchChange(query);
    });
  }

  private onSearchChange(query: string): void {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    if (!query.trim()) {
      this.searchResults.set([]);
      this.isSearching.set(false);
      return;
    }

    this.isSearching.set(true);
    
    this.searchTimeout = setTimeout(async () => {
      try {
        await this.recipeService.searchRecipes(query);
        this.searchResults.set(this.recipeService.allRecipes());
      } catch (error) {
        console.error('Search error:', error);
        this.searchResults.set([]);
      } finally {
        this.isSearching.set(false);
      }
    }, 300);
  }

  onViewRecipe(recipe: Recipe): void {
    this.recipeClicked.emit({ recipe, day: this.day(), mealType: this.mealType() });
  }

  onAddRecipe(recipe: Recipe, event: Event): void {
    event.stopPropagation();
    this.recipeSelected.emit(recipe);
  }

  onCancel(): void {
    this.cancelled.emit();
  }

  getMealTypeLabel(mealType: MealType): string {
    return mealType.charAt(0).toUpperCase() + mealType.slice(1);
  }
}
