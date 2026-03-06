import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DayOfWeek, MealType } from '../../models/meal-plan.model';

@Component({
  selector: 'app-meal-slot-picker',
  templateUrl: './meal-slot-picker.component.html',
  styleUrl: './meal-slot-picker.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule]
})
export class MealSlotPickerComponent {
  recipeTitle = input.required<string>();
  
  slotSelected = output<{ day: DayOfWeek; mealType: MealType }>();
  cancelled = output<void>();

  readonly days: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  readonly mealTypes: MealType[] = ['breakfast', 'lunch', 'dinner'];

  onSlotClick(day: DayOfWeek, mealType: MealType): void {
    this.slotSelected.emit({ day, mealType });
  }

  onCancel(): void {
    this.cancelled.emit();
  }

  getMealTypeLabel(mealType: MealType): string {
    return mealType.charAt(0).toUpperCase() + mealType.slice(1);
  }
}
