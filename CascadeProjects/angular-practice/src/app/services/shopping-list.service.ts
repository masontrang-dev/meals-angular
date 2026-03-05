import { Injectable, signal, computed, effect, inject } from '@angular/core';
import { MealPlanService } from './meal-plan.service';
import { ShoppingListItem, GroupedShoppingList, IngredientCategory } from '../models/shopping-list.model';
import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  private readonly STORAGE_KEY = 'shopping-list';
  private readonly mealPlanService = inject(MealPlanService);
  
  private readonly items = signal<ShoppingListItem[]>(this.loadFromStorage());
  
  readonly shoppingList = this.items.asReadonly();
  readonly currentWeek = this.mealPlanService.currentWeek;
  
  readonly groupedList = computed(() => {
    const grouped: GroupedShoppingList = {};
    const items = this.items();
    
    items.forEach(item => {
      if (!grouped[item.category]) {
        grouped[item.category] = [];
      }
      grouped[item.category].push(item);
    });
    
    Object.keys(grouped).forEach(category => {
      grouped[category].sort((a, b) => a.name.localeCompare(b.name));
    });
    
    return grouped;
  });
  
  readonly totalItems = computed(() => this.items().length);
  
  readonly checkedItems = computed(() => 
    this.items().filter(item => item.checked).length
  );
  
  readonly progress = computed(() => {
    const total = this.totalItems();
    if (total === 0) return 0;
    return Math.round((this.checkedItems() / total) * 100);
  });

  constructor() {
    effect(() => {
      this.saveToStorage(this.items());
    });
  }

  generateList(): void {
    const meals = this.mealPlanService.meals();
    const ingredientMap = new Map<string, ShoppingListItem>();
    
    Object.values(meals).forEach(dayMeals => {
      ['breakfast', 'lunch', 'dinner'].forEach(mealType => {
        const recipe = dayMeals[mealType as keyof typeof dayMeals];
        if (recipe?.extendedIngredients) {
          this.aggregateIngredients(recipe, ingredientMap);
        }
      });
    });
    
    this.items.set(Array.from(ingredientMap.values()));
  }

  private aggregateIngredients(recipe: Recipe, map: Map<string, ShoppingListItem>): void {
    recipe.extendedIngredients?.forEach(ingredient => {
      const key = ingredient.name.toLowerCase();
      
      if (map.has(key)) {
        const existing = map.get(key)!;
        if (existing.unit === ingredient.unit) {
          existing.amount += ingredient.amount;
        }
        existing.recipeIds.push(recipe.id);
      } else {
        map.set(key, {
          id: `${recipe.id}-${ingredient.id}`,
          name: ingredient.name,
          amount: ingredient.amount,
          unit: ingredient.unit,
          category: this.categorizeIngredient(ingredient.name),
          checked: false,
          recipeIds: [recipe.id]
        });
      }
    });
  }

  private categorizeIngredient(name: string): IngredientCategory {
    const nameLower = name.toLowerCase();
    
    if (/\b(lettuce|tomato|onion|garlic|pepper|carrot|celery|spinach|kale|broccoli|cauliflower|cucumber|zucchini|potato|apple|banana|orange|lemon|lime|berry|fruit|vegetable)\b/.test(nameLower)) {
      return 'Produce';
    }
    
    if (/\b(chicken|beef|pork|turkey|lamb|fish|salmon|tuna|shrimp|meat|bacon|sausage)\b/.test(nameLower)) {
      return 'Meat & Seafood';
    }
    
    if (/\b(milk|cheese|butter|cream|yogurt|egg|sour cream|cottage cheese)\b/.test(nameLower)) {
      return 'Dairy & Eggs';
    }
    
    if (/\b(bread|bun|roll|tortilla|pita|bagel|croissant)\b/.test(nameLower)) {
      return 'Bakery';
    }
    
    if (/\b(frozen|ice cream)\b/.test(nameLower)) {
      return 'Frozen';
    }
    
    if (/\b(juice|soda|coffee|tea|water|wine|beer)\b/.test(nameLower)) {
      return 'Beverages';
    }
    
    if (/\b(sauce|ketchup|mustard|mayo|mayonnaise|dressing|vinegar|oil|olive oil)\b/.test(nameLower)) {
      return 'Condiments & Sauces';
    }
    
    if (/\b(salt|pepper|spice|herb|oregano|basil|thyme|cumin|paprika|cinnamon|vanilla)\b/.test(nameLower)) {
      return 'Spices & Seasonings';
    }
    
    if (/\b(flour|sugar|rice|pasta|bean|lentil|oat|cereal|honey|syrup)\b/.test(nameLower)) {
      return 'Pantry';
    }
    
    return 'Other';
  }

  toggleItem(itemId: string): void {
    this.items.update(items => 
      items.map(item => 
        item.id === itemId 
          ? { ...item, checked: !item.checked } 
          : item
      )
    );
  }

  removeItem(itemId: string): void {
    this.items.update(items => items.filter(item => item.id !== itemId));
  }

  clearList(): void {
    this.items.set([]);
  }

  clearCheckedItems(): void {
    this.items.update(items => items.filter(item => !item.checked));
  }

  private loadFromStorage(): ShoppingListItem[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  private saveToStorage(items: ShoppingListItem[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Failed to save shopping list:', error);
    }
  }
}
