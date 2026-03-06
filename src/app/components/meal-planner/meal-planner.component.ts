import { Component, inject, output, signal, ChangeDetectionStrategy, computed } from '@angular/core';
import { MealPlanService } from '../../services/meal-plan.service';
import { MealSlotComponent } from '../meal-slot/meal-slot.component';
import { EmptyStateComponent } from '../empty-state/empty-state.component';
import { DiningOutModalComponent } from '../dining-out-modal/dining-out-modal.component';
import { InlineRecipeSearchComponent } from '../inline-recipe-search/inline-recipe-search.component';
import { DayOfWeek, MealType } from '../../models/meal-plan.model';
import { Recipe } from '../../models/recipe.model';
import { formatWeekRange, isCurrentWeek } from '../../models/week.model';

@Component({
  selector: 'app-meal-planner',
  templateUrl: './meal-planner.component.html',
  styleUrl: './meal-planner.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MealSlotComponent, DiningOutModalComponent, InlineRecipeSearchComponent]
})
export class MealPlannerComponent {
  private readonly mealPlanService = inject(MealPlanService);
  
  readonly meals = this.mealPlanService.meals;
  readonly totalMeals = this.mealPlanService.totalMeals;
  readonly currentWeek = this.mealPlanService.currentWeek;
  
  readonly weekRange = computed(() => formatWeekRange(this.currentWeek()));
  readonly isCurrentWeek = computed(() => isCurrentWeek(this.currentWeek()));
  
  readonly days: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  readonly mealTypes: MealType[] = ['breakfast', 'lunch', 'dinner'];
  
  recipeClicked = output<{ recipe: Recipe; day?: DayOfWeek; mealType?: MealType }>();
  
  showDiningOutModal = signal(false);
  diningOutDay = signal<DayOfWeek | null>(null);
  diningOutMealType = signal<MealType | null>(null);
  
  showSearchModal = signal(false);
  searchDay = signal<DayOfWeek | null>(null);
  searchMealType = signal<MealType | null>(null);

  getMealTypeLabel(mealType: MealType): string {
    return mealType.charAt(0).toUpperCase() + mealType.slice(1);
  }

  getRecipeForSlot(day: DayOfWeek, mealType: MealType): Recipe | undefined {
    const dayMeals = this.meals()[day];
    return dayMeals?.[mealType];
  }

  onRecipeDropped(event: { day: DayOfWeek; mealType: MealType; recipe: Recipe }): void {
    this.mealPlanService.addMeal(event.day, event.mealType, event.recipe);
  }

  onRecipeRemoved(event: { day: DayOfWeek; mealType: MealType }): void {
    this.mealPlanService.removeMeal(event.day, event.mealType);
  }

  onRecipeClicked(event: { recipe: Recipe; day: DayOfWeek; mealType: MealType }): void {
    this.recipeClicked.emit({ recipe: event.recipe, day: event.day, mealType: event.mealType });
  }

  clearWeek(): void {
    if (confirm('Are you sure you want to clear all meals for the week?')) {
      this.mealPlanService.clearWeek();
    }
  }

  previousWeek(): void {
    this.mealPlanService.goToPreviousWeek();
  }

  nextWeek(): void {
    this.mealPlanService.goToNextWeek();
  }

  goToToday(): void {
    this.mealPlanService.goToCurrentWeek();
  }

  onDiningOutClicked(event: { day: DayOfWeek; mealType: MealType }): void {
    this.diningOutDay.set(event.day);
    this.diningOutMealType.set(event.mealType);
    this.showDiningOutModal.set(true);
  }

  onDiningOutSaved(restaurantName: string): void {
    const day = this.diningOutDay();
    const mealType = this.diningOutMealType();
    
    if (day && mealType && restaurantName.trim()) {
      // Create a special "dining out" recipe
      const diningOutRecipe: Recipe = {
        id: Date.now(),
        title: restaurantName,
        image: 'https://via.placeholder.com/300x200?text=Dining+Out',
        readyInMinutes: 0,
        servings: 0,
        custom: true,
        diningOut: true
      };
      
      this.mealPlanService.addMeal(day, mealType, diningOutRecipe);
    }
    
    this.closeDiningOutModal();
  }

  closeDiningOutModal(): void {
    this.showDiningOutModal.set(false);
    this.diningOutDay.set(null);
    this.diningOutMealType.set(null);
  }

  onSearchClicked(event: { day: DayOfWeek; mealType: MealType }): void {
    this.searchDay.set(event.day);
    this.searchMealType.set(event.mealType);
    this.showSearchModal.set(true);
  }

  onRecipeSelected(recipe: Recipe): void {
    const day = this.searchDay();
    const mealType = this.searchMealType();
    
    if (day && mealType) {
      this.mealPlanService.addMeal(day, mealType, recipe);
    }
    
    this.closeSearchModal();
  }

  closeSearchModal(): void {
    this.showSearchModal.set(false);
    this.searchDay.set(null);
    this.searchMealType.set(null);
  }
}
