import { Component, input, output, computed, ChangeDetectionStrategy } from '@angular/core';
import { CdkDrag, CdkDragPreview } from '@angular/cdk/drag-drop';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CdkDrag, CdkDragPreview]
})
export class RecipeCardComponent {
  recipe = input.required<Recipe>();
  cardClicked = output<Recipe>();
  editClicked = output<Recipe>();
  deleteClicked = output<Recipe>();

  readonly isCustom = computed(() => {
    const recipe = this.recipe();
    return 'isCustom' in recipe && recipe.isCustom === true;
  });

  onCardClick(): void {
    this.cardClicked.emit(this.recipe());
  }

  onEdit(event: Event): void {
    event.stopPropagation();
    this.editClicked.emit(this.recipe());
  }

  onDelete(event: Event): void {
    event.stopPropagation();
    this.deleteClicked.emit(this.recipe());
  }
}
