import { Component, inject, signal, effect, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CdkDropList } from '@angular/cdk/drag-drop';
import { debounceTime } from 'rxjs';
import { RecipeService } from '../../services/recipe.service';
import { ToastService } from '../../services/toast.service';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';
import { RecipeDetailComponent } from '../recipe-detail/recipe-detail.component';
import { RecipeFormComponent } from '../recipe-form/recipe-form.component';
import { LoadingSkeletonComponent } from '../loading-skeleton/loading-skeleton.component';
import { EmptyStateComponent } from '../empty-state/empty-state.component';
import { Recipe } from '../../models/recipe.model';
import { CustomRecipe } from '../../models/custom-recipe.model';

@Component({
  selector: 'app-recipe-search',
  templateUrl: './recipe-search.component.html',
  styleUrl: './recipe-search.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, RecipeCardComponent, RecipeDetailComponent, RecipeFormComponent, CdkDropList, LoadingSkeletonComponent, EmptyStateComponent]
})
export class RecipeSearchComponent {
  private readonly recipeService = inject(RecipeService);
  private readonly toastService = inject(ToastService);
  
  readonly searchControl = new FormControl('');
  readonly recipes = this.recipeService.allRecipes;
  readonly loading = this.recipeService.loading;
  readonly error = this.recipeService.error;
  readonly usingFallback = this.recipeService.usingFallback;
  readonly showInitialState = signal(true);
  readonly selectedRecipe = this.recipeService.selectedRecipe;
  readonly showDetail = signal(false);
  readonly showRecipeForm = signal(false);

  // Generate all meal slot IDs for drag-and-drop connection
  readonly mealSlotIds: string[] = [];

  constructor() {
    // Generate IDs for all 21 meal slots (7 days × 3 meals)
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const mealTypes = ['breakfast', 'lunch', 'dinner'];
    
    for (const day of days) {
      for (const mealType of mealTypes) {
        this.mealSlotIds.push(`meal-slot-${day}-${mealType}`);
      }
    }
    
    // Setup search subscription
    this.searchControl.valueChanges
      .pipe(debounceTime(500))
      .subscribe(query => {
        if (query && query.trim()) {
          this.showInitialState.set(false);
          this.recipeService.searchRecipes(query);
        } else {
          this.showInitialState.set(true);
          this.recipeService.recipes.set([]);
        }
      });
  }

  async onRecipeClick(recipe: Recipe): Promise<void> {
    await this.recipeService.getRecipeDetails(recipe.id);
    this.showDetail.set(true);
  }

  onCloseDetail(): void {
    this.showDetail.set(false);
  }

  loadRandomRecipes(): void {
    this.showInitialState.set(false);
    this.recipeService.getRandomRecipes();
  }

  clearError(): void {
    this.recipeService.clearError();
  }

  openRecipeForm(): void {
    this.showRecipeForm.set(true);
  }

  onRecipeFormClose(): void {
    this.showRecipeForm.set(false);
  }

  async onRecipeSaved(recipe: CustomRecipe): Promise<void> {
    this.showRecipeForm.set(false);
    await this.recipeService.loadCustomRecipes();
  }

  onEditRecipe(recipe: Recipe): void {
    this.toastService.show('Edit functionality coming soon!', 'info');
  }

  async onDeleteRecipe(recipe: Recipe): Promise<void> {
    if (!this.recipeService.isCustomRecipe(recipe)) {
      return;
    }

    if (confirm(`Delete "${recipe.title}"?`)) {
      try {
        await this.recipeService.deleteCustomRecipe(recipe.id);
        this.toastService.show('Recipe deleted successfully', 'success');
      } catch (error) {
        this.toastService.show('Failed to delete recipe', 'error');
      }
    }
  }
}
