import { Recipe } from './recipe.model';

export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
export type MealType = 'breakfast' | 'lunch' | 'dinner';

export interface MealPlan {
  [day: string]: DayMeals;
}

export interface DayMeals {
  breakfast?: Recipe;
  lunch?: Recipe;
  dinner?: Recipe;
}

export interface MealSlot {
  day: DayOfWeek;
  mealType: MealType;
  recipe?: Recipe;
}
