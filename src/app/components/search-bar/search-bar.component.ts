import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { QuerysService } from '@services/querys.service';
import { IconComponent } from '@components/icon/icon.component';

@Component({
  selector: 'app-search-bar',
  imports: [CommonModule, IconComponent],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent {
  @Input() param: string = 'search';
  @Input() query: string = '';
  @Input() placeholder: string = 'Search...';
  @Input() showLabel: boolean = true;
  @Input() labelInput: string = 'Search';
  @Input() showClearButton: boolean = true;
  @Input() searchIcon: string = 'magnifying-glass';
  @Input() hasError: boolean = false;
  @Input() errorMessage: string = 'No results found';
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
        await this.queryService.updateQueryParam({ [this.param]: this.query });
        this.loading = false;
      } else {
        this.loading = false;
        this.searchChange.emit('');
        await this.queryService.removeQueryParams([this.param]);
      }
    }, 950);

    // console.log(this.query);
    // console.log(this.loading);
  }

  clearSearch(): void {
    this.query = '';
    this.searchChange.emit('');
    this.queryService.removeQueryParams([this.param]);
  }

  setFocusOnInput(): void {
    const input = document.getElementById('inputSearch') as HTMLInputElement;
    if (input) {
      input.focus();
    }
  }
}
