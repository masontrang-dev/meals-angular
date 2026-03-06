import { Injectable, signal, computed, effect, inject } from '@angular/core';
import { MealPlan, DayOfWeek, MealType } from '../models/meal-plan.model';
import { Recipe } from '../models/recipe.model';
import { ToastService } from './toast.service';
import { WeekIdentifier, getCurrentWeek, getWeekOffset, getWeekKey } from '../models/week.model';

@Injectable({
  providedIn: 'root'
})
export class MealPlanService {
  private readonly toastService = inject(ToastService);
  private readonly STORAGE_KEY_PREFIX = 'meal-plan-';
  
  readonly currentWeek = signal<WeekIdentifier>(getCurrentWeek());
  private readonly weeklyPlans = signal<Map<string, MealPlan>>(new Map());
  
  readonly currentMealPlan = computed(() => {
    const weekKey = getWeekKey(this.currentWeek());
    return this.weeklyPlans().get(weekKey) || this.getEmptyWeek();
  });
  
  readonly meals = computed(() => this.currentMealPlan());
  
  readonly totalMeals = computed(() => {
    const plan = this.currentMealPlan();
    let count = 0;
    Object.values(plan).forEach(day => {
      if (day.breakfast) count++;
      if (day.lunch) count++;
      if (day.dinner) count++;
    });
    return count;
  });

  readonly totalCalories = computed(() => {
    const plan = this.currentMealPlan();
    let total = 0;
    Object.values(plan).forEach(day => {
      [day.breakfast, day.lunch, day.dinner].forEach(recipe => {
        if (recipe?.nutrition?.nutrients) {
          const calories = recipe.nutrition.nutrients.find(n => n.name === 'Calories');
          if (calories) {
            total += calories.amount;
          }
        }
      });
    });
    return Math.round(total);
  });

  readonly averagePrepTime = computed(() => {
    const plan = this.currentMealPlan();
    let totalTime = 0;
    let count = 0;
    Object.values(plan).forEach(day => {
      [day.breakfast, day.lunch, day.dinner].forEach(recipe => {
        if (recipe?.readyInMinutes) {
          totalTime += recipe.readyInMinutes;
          count++;
        }
      });
    });
    return count > 0 ? Math.round(totalTime / count) : 0;
  });

  constructor() {
    this.loadWeek(this.currentWeek());
    
    effect(() => {
      const weekKey = getWeekKey(this.currentWeek());
      const plan = this.currentMealPlan();
      this.saveWeek(this.currentWeek(), plan);
    });
  }

  addMeal(day: DayOfWeek, mealType: MealType, recipe: Recipe): void {
    const weekKey = getWeekKey(this.currentWeek());
    
    this.weeklyPlans.update(plans => {
      const newPlans = new Map(plans);
      const currentPlan = newPlans.get(weekKey) || {};
      const updatedPlan = { ...currentPlan };
      
      if (!updatedPlan[day]) {
        updatedPlan[day] = {};
      } else {
        updatedPlan[day] = { ...updatedPlan[day] };
      }
      
      updatedPlan[day][mealType] = recipe;
      newPlans.set(weekKey, updatedPlan);
      
      return newPlans;
    });
    
    this.toastService.success(`Added "${recipe.title}" to ${day} ${mealType}`);
  }

  removeMeal(day: DayOfWeek, mealType: MealType): void {
    const recipe = this.getMeal(day, mealType);
    const weekKey = getWeekKey(this.currentWeek());
    
    this.weeklyPlans.update(plans => {
      const newPlans = new Map(plans);
      const currentPlan = newPlans.get(weekKey) || {};
      const updatedPlan = { ...currentPlan };
      
      if (updatedPlan[day]) {
        updatedPlan[day] = { ...updatedPlan[day] };
        delete updatedPlan[day][mealType];
        
        if (Object.keys(updatedPlan[day]).length === 0) {
          delete updatedPlan[day];
        }
      }
      
      newPlans.set(weekKey, updatedPlan);
      return newPlans;
    });
    
    if (recipe) {
      this.toastService.info(`Removed "${recipe.title}" from ${day} ${mealType}`);
    }
  }

  clearWeek(): void {
    const mealCount = this.totalMeals();
    const weekKey = getWeekKey(this.currentWeek());
    
    this.weeklyPlans.update(plans => {
      const newPlans = new Map(plans);
      newPlans.set(weekKey, {});
      return newPlans;
    });
    
    if (mealCount > 0) {
      this.toastService.warning(`Cleared ${mealCount} meal${mealCount !== 1 ? 's' : ''} from your plan`);
    }
  }

  getMeal(day: DayOfWeek, mealType: MealType): Recipe | undefined {
    return this.currentMealPlan()[day]?.[mealType];
  }

  goToNextWeek(): void {
    this.currentWeek.update(week => getWeekOffset(week, 1));
    this.loadWeek(this.currentWeek());
  }

  goToPreviousWeek(): void {
    this.currentWeek.update(week => getWeekOffset(week, -1));
    this.loadWeek(this.currentWeek());
  }

  goToCurrentWeek(): void {
    this.currentWeek.set(getCurrentWeek());
    this.loadWeek(this.currentWeek());
  }

  private getEmptyWeek(): MealPlan {
    return {};
  }

  private loadWeek(week: WeekIdentifier): void {
    const weekKey = getWeekKey(week);
    const stored = this.loadFromStorage(weekKey);
    if (stored) {
      this.weeklyPlans.update(plans => {
        const newPlans = new Map(plans);
        newPlans.set(weekKey, stored);
        return newPlans;
      });
    }
  }

  private saveWeek(week: WeekIdentifier, plan: MealPlan): void {
    const weekKey = getWeekKey(week);
    this.saveToStorage(weekKey, plan);
  }

  private loadFromStorage(weekKey: string): MealPlan | null {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY_PREFIX + weekKey);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load meal plan from storage:', error);
    }
    return null;
  }

  private saveToStorage(weekKey: string, plan: MealPlan): void {
    try {
      localStorage.setItem(this.STORAGE_KEY_PREFIX + weekKey, JSON.stringify(plan));
    } catch (error) {
      console.error('Failed to save meal plan to storage:', error);
    }
  }
}
