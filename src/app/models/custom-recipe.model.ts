import { Recipe } from './recipe.model';

export interface CustomRecipe extends Recipe {
  isCustom: true;
  createdAt: Date;
  updatedAt: Date;
  userId?: string;
}
