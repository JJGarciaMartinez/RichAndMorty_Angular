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

  getPagesArray(): number[] {
    const totalPages = 3;
    const pages = [] as number[];
    let startPage = Math.max(1, this.pageCurrent - 1);
    let endPage = Math.min(this.info.pages, this.pageCurrent + 1);

    // Adjust startPage and endPage to always show 5 pages
    if (endPage - startPage + 1 < totalPages) {
      if (startPage === 1) {
        endPage = Math.min(this.info.pages, startPage + totalPages - 1);
      } else if (endPage === this.info.pages) {
        startPage = Math.max(1, endPage - totalPages + 1);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }
}
