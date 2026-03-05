import { Component, signal, inject } from '@angular/core';
import { Recipe } from './models/recipe.model';
import { DayOfWeek, MealType } from './models/meal-plan.model';
import { MealPlanService } from './services/meal-plan.service';
import { RouterOutlet } from '@angular/router';
import { RecipeSearchComponent } from './components/recipe-search/recipe-search.component';
import { MealPlannerComponent } from './components/meal-planner/meal-planner.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { ToastComponent } from './components/toast/toast.component';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';
import { MealSlotPickerComponent } from './components/meal-slot-picker/meal-slot-picker.component';

type ActiveTab = 'planner' | 'shopping';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet, 
    RecipeSearchComponent, 
    MealPlannerComponent, 
    ShoppingListComponent,
    ToastComponent,
    RecipeDetailComponent,
    MealSlotPickerComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private readonly mealPlanService = inject(MealPlanService);
  
  protected readonly activeTab = signal<ActiveTab>('planner');
  protected readonly selectedRecipe = signal<Recipe | null>(null);
  protected readonly selectedDay = signal<DayOfWeek | null>(null);
  protected readonly selectedMealType = signal<MealType | null>(null);
  protected readonly showRecipeDetail = signal(false);
  protected readonly showMealSlotPicker = signal(false);
  protected readonly recipeToAdd = signal<Recipe | null>(null);

  setActiveTab(tab: ActiveTab): void {
    this.activeTab.set(tab);
  }

  onRecipeClicked(event: { recipe: Recipe; day?: DayOfWeek; mealType?: MealType }): void {
    this.selectedRecipe.set(event.recipe);
    this.selectedDay.set(event.day || null);
    this.selectedMealType.set(event.mealType || null);
    this.showRecipeDetail.set(true);
  }

  onCloseRecipeDetail(): void {
    this.showRecipeDetail.set(false);
    this.selectedRecipe.set(null);
    this.selectedDay.set(null);
    this.selectedMealType.set(null);
  }

  onRecipeAdded(recipe: Recipe): void {
    const day = this.selectedDay();
    const mealType = this.selectedMealType();
    
    if (day && mealType) {
      // We have context from inline search - add directly
      this.mealPlanService.addMeal(day, mealType, recipe);
      this.onCloseRecipeDetail();
    } else {
      // No context - show meal slot picker
      this.recipeToAdd.set(recipe);
      this.showMealSlotPicker.set(true);
    }
  }

  onMealSlotSelected(event: { day: DayOfWeek; mealType: MealType }): void {
    const recipe = this.recipeToAdd();
    if (recipe) {
      this.mealPlanService.addMeal(event.day, event.mealType, recipe);
      this.closeMealSlotPicker();
      this.onCloseRecipeDetail();
    }
  }

  closeMealSlotPicker(): void {
    this.showMealSlotPicker.set(false);
    this.recipeToAdd.set(null);
  }

  onDiningOutUpdated(event: { id: number; name: string }): void {
    // Find and update the dining out entry in the meal plan
    const meals = this.mealPlanService.meals();
    for (const day of Object.keys(meals)) {
      for (const mealType of Object.keys(meals[day as keyof typeof meals])) {
        const recipe = meals[day as keyof typeof meals][mealType as keyof typeof meals[typeof day]];
        if (recipe && recipe.id === event.id && recipe.diningOut) {
          // Update the recipe with new name
          const updatedRecipe: Recipe = {
            ...recipe,
            title: event.name
          };
          this.mealPlanService.addMeal(day as any, mealType as any, updatedRecipe);
          break;
        }
      }
    }
  }

  onDiningOutDeleted(recipeId: number): void {
    // Find and remove the dining out entry from the meal plan
    const meals = this.mealPlanService.meals();
    for (const day of Object.keys(meals)) {
      for (const mealType of Object.keys(meals[day as keyof typeof meals])) {
        const recipe = meals[day as keyof typeof meals][mealType as keyof typeof meals[typeof day]];
        if (recipe && recipe.id === recipeId && recipe.diningOut) {
          this.mealPlanService.removeMeal(day as any, mealType as any);
          return;
        }
      }
    }
  }
}
