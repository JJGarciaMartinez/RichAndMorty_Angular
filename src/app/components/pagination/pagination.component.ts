import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconComponent } from '@components/icon/icon.component';

@Component({
  selector: 'app-pagination',
  imports: [CommonModule, IconComponent],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent {
  @Input() info: any;
  @Input() pageCurrent: number = 0;
  @Input() listPages: number[] = [];
  @Input() isLoading: boolean = false;

  @Output() pageChange = new EventEmitter<number>();

  previousPage() {
    if (this.info.prev) {
      this.pageChange.emit(this.pageCurrent - 1);
    }
  }

  nextPage() {
    if (this.info.next) {
      this.pageChange.emit(this.pageCurrent + 1);
    }
  }

  goToPage(page: number) {
    this.pageChange.emit(page);
  }
}
