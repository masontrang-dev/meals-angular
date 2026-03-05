import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ShoppingListItem } from '../../models/shopping-list.model';

@Component({
  selector: 'app-shopping-list-item',
  templateUrl: './shopping-list-item.component.html',
  styleUrl: './shopping-list-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DecimalPipe]
})
export class ShoppingListItemComponent {
  item = input.required<ShoppingListItem>();
  
  itemToggled = output<string>();
  itemRemoved = output<string>();

  onToggle(): void {
    this.itemToggled.emit(this.item().id);
  }

  onRemove(): void {
    this.itemRemoved.emit(this.item().id);
  }
}
