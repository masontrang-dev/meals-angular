export type IngredientCategory = 
  | 'Produce' 
  | 'Meat & Seafood' 
  | 'Dairy & Eggs' 
  | 'Bakery' 
  | 'Pantry' 
  | 'Frozen' 
  | 'Beverages' 
  | 'Condiments & Sauces' 
  | 'Spices & Seasonings' 
  | 'Other';

export interface ShoppingListItem {
  id: string;
  name: string;
  amount: number;
  unit: string;
  category: IngredientCategory;
  checked: boolean;
  recipeIds: number[];
}

export interface GroupedShoppingList {
  [category: string]: ShoppingListItem[];
}
