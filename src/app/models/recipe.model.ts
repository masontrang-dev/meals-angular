export interface Recipe {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  summary?: string;
  cuisines?: string[];
  dishTypes?: string[];
  diets?: string[];
  extendedIngredients?: Ingredient[];
  analyzedInstructions?: Instruction[];
  nutrition?: Nutrition;
  custom?: boolean;
  diningOut?: boolean;
}

export interface Ingredient {
  id: number;
  name: string;
  amount: number;
  unit: string;
  original: string;
}

export interface Instruction {
  name: string;
  steps: Step[];
}

export interface Step {
  number: number;
  step: string;
}

export interface Nutrition {
  nutrients: Nutrient[];
}

export interface Nutrient {
  name: string;
  amount: number;
  unit: string;
}
