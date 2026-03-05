import { Component, inject, computed, ChangeDetectionStrategy } from '@angular/core';
import { ShoppingListService } from '../../services/shopping-list.service';
import { ShoppingListItemComponent } from '../shopping-list-item/shopping-list-item.component';
import { ToastService } from '../../services/toast.service';
import { formatWeekRange } from '../../models/week.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ShoppingListItemComponent]
})
export class ShoppingListComponent {
  private readonly shoppingListService = inject(ShoppingListService);
  private readonly toastService = inject(ToastService);
  
  readonly groupedList = this.shoppingListService.groupedList;
  readonly totalItems = this.shoppingListService.totalItems;
  readonly checkedItems = this.shoppingListService.checkedItems;
  readonly progress = this.shoppingListService.progress;
  readonly currentWeek = this.shoppingListService.currentWeek;
  
  readonly weekRange = computed(() => formatWeekRange(this.currentWeek()));
  readonly categories = computed(() => Object.keys(this.groupedList()));

  generateList(): void {
    this.shoppingListService.generateList();
    const count = this.totalItems();
    if (count > 0) {
      this.toastService.success(`Shopping list generated with ${count} items!`);
    } else {
      this.toastService.warning('No meals in your plan. Add some recipes first!');
    }
  }

  onItemToggled(itemId: string): void {
    this.shoppingListService.toggleItem(itemId);
  }

  onItemRemoved(itemId: string): void {
    this.shoppingListService.removeItem(itemId);
    this.toastService.info('Item removed from list');
  }

  clearChecked(): void {
    if (confirm('Remove all checked items?')) {
      this.shoppingListService.clearCheckedItems();
      this.toastService.info('Checked items cleared');
    }
  }

  clearAll(): void {
    if (confirm('Clear entire shopping list?')) {
      this.shoppingListService.clearList();
      this.toastService.warning('Shopping list cleared');
    }
  }

  printList(): void {
    window.print();
  }
}
