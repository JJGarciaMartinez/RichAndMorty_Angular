import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormModule } from '@coreui/angular';
import { QuerysService } from '@services/querys.service';
import { IconComponent } from '@components/icon/icon.component';

@Component({
  selector: 'app-search-bar',
  imports: [FormModule, CommonModule, IconComponent],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent {
  @Input() query = '';
  @Input() placeholder = 'Search...';
  @Input() showLabel = true;
  @Input() labelInput = 'Search';
  @Input() showClearButton = true;
  @Input() searchIcon = 'magnifying-glass';
  @Input() hasError = false;
  @Input() errorMessage = 'No results found';
  @Output() searchChange = new EventEmitter<string>();

  loading = false;
  private debounceTimeout: any;

  constructor(private queryService: QuerysService) {}

  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.query = input.value;

    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }

    this.loading = true;

    this.debounceTimeout = setTimeout(async () => {
      if (this.query) {
        this.searchChange.emit(this.query);
        await this.queryService.addQueryParams({ search: this.query });
        this.loading = false;
      } else {
        this.loading = false;
        this.searchChange.emit('');
        await this.queryService.clearQueryParams(['search']);
      }
    }, 950);

    // console.log(this.query);
    // console.log(this.loading);
  }

  clearSearch(): void {
    this.query = '';
    this.searchChange.emit('');
    this.queryService.clearQueryParams(['search']);
  }

  setFocusOnInput(): void {
    const input = document.getElementById('inputSearch') as HTMLInputElement;
    if (input) {
      input.focus();
    }
  }
}
