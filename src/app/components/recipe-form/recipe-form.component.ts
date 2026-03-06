import { ChangeDetectionStrategy, Component, inject, signal, output } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomRecipeStorageService } from '../../services/custom-recipe-storage.service';
import { ToastService } from '../../services/toast.service';
import { CustomRecipe } from '../../models/custom-recipe.model';
import { Ingredient, Step } from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrl: './recipe-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule]
})
export class RecipeFormComponent {
  private readonly customRecipeStorage = inject(CustomRecipeStorageService);
  private readonly toastService = inject(ToastService);
  
  readonly recipeSaved = output<CustomRecipe>();
  readonly cancelled = output<void>();
  
  readonly recipeForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    image: new FormControl('', [Validators.required, Validators.pattern(/^https?:\/\/.*/)]),
    readyInMinutes: new FormControl(30, [Validators.required, Validators.min(1)]),
    servings: new FormControl(4, [Validators.required, Validators.min(1)]),
    summary: new FormControl(''),
    ingredients: new FormArray<FormGroup>([]),
    instructions: new FormArray<FormGroup>([])
  });
  
  readonly saving = signal(false);
  
  get ingredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }
  
  get instructions(): FormArray {
    return this.recipeForm.get('instructions') as FormArray;
  }
  
  constructor() {
    this.addIngredient();
    this.addInstruction();
  }
  
  addIngredient(): void {
    const ingredientGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      amount: new FormControl(1, [Validators.required, Validators.min(0.1)]),
      unit: new FormControl('', [Validators.required])
    });
    this.ingredients.push(ingredientGroup);
  }
  
  removeIngredient(index: number): void {
    if (this.ingredients.length > 1) {
      this.ingredients.removeAt(index);
    }
  }
  
  addInstruction(): void {
    const instructionGroup = new FormGroup({
      step: new FormControl(this.instructions.length + 1, [Validators.required]),
      text: new FormControl('', [Validators.required, Validators.minLength(5)])
    });
    this.instructions.push(instructionGroup);
  }
  
  removeInstruction(index: number): void {
    if (this.instructions.length > 1) {
      this.instructions.removeAt(index);
      this.updateInstructionSteps();
    }
  }
  
  private updateInstructionSteps(): void {
    this.instructions.controls.forEach((control, index) => {
      control.get('step')?.setValue(index + 1);
    });
  }
  
  async onSubmit(): Promise<void> {
    if (this.recipeForm.invalid) {
      this.recipeForm.markAllAsTouched();
      this.toastService.show('Please fill in all required fields correctly', 'error');
      return;
    }
    
    this.saving.set(true);
    
    try {
      const formValue = this.recipeForm.value;
      
      const customRecipe: CustomRecipe = {
        id: Date.now(),
        title: formValue.title!,
        image: formValue.image!,
        readyInMinutes: formValue.readyInMinutes!,
        servings: formValue.servings!,
        summary: formValue.summary || '',
        extendedIngredients: (formValue.ingredients || []).map((ing: any, index: number) => ({
          id: index + 1,
          name: ing.name,
          amount: ing.amount,
          unit: ing.unit,
          original: `${ing.amount} ${ing.unit} ${ing.name}`
        })) as Ingredient[],
        analyzedInstructions: [{
          name: '',
          steps: (formValue.instructions || []).map((inst: any) => ({
            number: inst.step,
            step: inst.text
          })) as Step[]
        }],
        isCustom: true,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      await this.customRecipeStorage.saveRecipe(customRecipe);
      this.toastService.show('Recipe saved successfully!', 'success');
      this.recipeSaved.emit(customRecipe);
      this.recipeForm.reset();
      this.ingredients.clear();
      this.instructions.clear();
      this.addIngredient();
      this.addInstruction();
    } catch (error) {
      console.error('Error saving recipe:', error);
      this.toastService.show('Failed to save recipe. Please try again.', 'error');
    } finally {
      this.saving.set(false);
    }
  }
  
  onCancel(): void {
    this.cancelled.emit();
  }
}
