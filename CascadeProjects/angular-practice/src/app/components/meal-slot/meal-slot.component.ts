import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { CdkDropList, CdkDropListGroup, CdkDrag, CdkDragDrop } from '@angular/cdk/drag-drop';
import { Recipe } from '../../models/recipe.model';
import { DayOfWeek, MealType } from '../../models/meal-plan.model';

@Component({
  selector: 'app-meal-slot',
  templateUrl: './meal-slot.component.html',
  styleUrl: './meal-slot.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CdkDropList]
})
export class MealSlotComponent {
  day = input.required<DayOfWeek>();
  mealType = input.required<MealType>();
  recipe = input<Recipe | undefined>();
  
  recipeDropped = output<{ day: DayOfWeek; mealType: MealType; recipe: Recipe }>();
  recipeRemoved = output<{ day: DayOfWeek; mealType: MealType }>();
  recipeClicked = output<{ recipe: Recipe; day: DayOfWeek; mealType: MealType }>();
  diningOutClicked = output<{ day: DayOfWeek; mealType: MealType }>();
  searchClicked = output<{ day: DayOfWeek; mealType: MealType }>();

  onDrop(event: CdkDragDrop<Recipe | undefined>): void {
    console.log('🎯 Drop event fired!', {
      previousContainer: event.previousContainer.id,
      currentContainer: event.container.id,
      itemData: event.item.data,
      previousData: event.previousContainer.data,
      currentData: event.container.data
    });
    
    // Recipe is being dragged from the recipe list to this meal slot
    const recipe = event.item.data as Recipe;
    console.log('📦 Extracted recipe:', recipe);
    
    if (recipe) {
      console.log('✅ Emitting recipeDropped event', {
        day: this.day(),
        mealType: this.mealType(),
        recipe: recipe.title
      });
      this.recipeDropped.emit({
        day: this.day(),
        mealType: this.mealType(),
        recipe: recipe
      });
    } else {
      console.warn('❌ No recipe data found in drop event');
    }
  }

  onRemove(): void {
    this.recipeRemoved.emit({
      day: this.day(),
      mealType: this.mealType()
    });
  }

  onRecipeClick(): void {
    const currentRecipe = this.recipe();
    if (currentRecipe) {
      this.recipeClicked.emit({ recipe: currentRecipe, day: this.day(), mealType: this.mealType() });
    }
  }

  onDiningOutClick(): void {
    this.diningOutClicked.emit({
      day: this.day(),
      mealType: this.mealType()
    });
  }

  onSearchClick(): void {
    this.searchClicked.emit({
      day: this.day(),
      mealType: this.mealType()
    });
  }
}
