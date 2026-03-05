import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Recipe } from '../../models/recipe.model';
import { DayOfWeek, MealType } from '../../models/meal-plan.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule]
})
export class RecipeDetailComponent {
  recipe = input.required<Recipe>();
  day = input<DayOfWeek | null>(null);
  mealType = input<MealType | null>(null);
  
  close = output<void>();
  recipeAdded = output<Recipe>();
  diningOutUpdated = output<{ id: number; name: string }>();
  diningOutDeleted = output<number>();
  
  editedRestaurantName = '';

  readonly hasInstructions = computed(() => {
    return this.recipe().analyzedInstructions && 
           this.recipe().analyzedInstructions!.length > 0;
  });

  readonly hasIngredients = computed(() => {
    return this.recipe().extendedIngredients && 
           this.recipe().extendedIngredients!.length > 0;
  });

  readonly hasNutrition = computed(() => {
    return this.recipe().nutrition?.nutrients && 
           this.recipe().nutrition!.nutrients.length > 0;
  });

  readonly mainNutrients = computed(() => {
    if (!this.hasNutrition()) return [];
    
    const nutrients = this.recipe().nutrition!.nutrients;
    const mainNames = ['Calories', 'Protein', 'Carbohydrates', 'Fat'];
    
    return nutrients.filter(n => mainNames.includes(n.name));
  });

  onClose(): void {
    this.close.emit();
  }

  onAddToPlan(): void {
    this.recipeAdded.emit(this.recipe());
  }
  
  ngOnInit(): void {
    if (this.recipe().diningOut) {
      this.editedRestaurantName = this.recipe().title;
    }
  }
  
  onSaveDiningOut(): void {
    if (this.editedRestaurantName.trim()) {
      this.diningOutUpdated.emit({
        id: this.recipe().id,
        name: this.editedRestaurantName.trim()
      });
      this.close.emit();
    }
  }
  
  onDeleteDiningOut(): void {
    if (confirm('Are you sure you want to remove this dining out entry?')) {
      this.diningOutDeleted.emit(this.recipe().id);
      this.close.emit();
    }
  }

  stripHtml(html: string): string {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  }
}
