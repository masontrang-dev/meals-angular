import { Component, output, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dining-out-modal',
  templateUrl: './dining-out-modal.component.html',
  styleUrl: './dining-out-modal.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule]
})
export class DiningOutModalComponent {
  saved = output<string>();
  cancelled = output<void>();

  restaurantName = '';

  onSave(): void {
    if (this.restaurantName.trim()) {
      this.saved.emit(this.restaurantName.trim());
      this.restaurantName = '';
    }
  }

  onCancel(): void {
    this.restaurantName = '';
    this.cancelled.emit();
  }

  onBackdropClick(): void {
    this.onCancel();
  }
}
