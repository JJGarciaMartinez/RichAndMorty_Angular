import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LoaderSpinnerComponent } from '@components/loader-spinner/loader-spinner.component';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-small-cards',
  imports: [CommonModule, LoaderSpinnerComponent, RouterLink],
  templateUrl: './small-cards.component.html',
  styleUrl: './small-cards.component.css',
})
export class SmallCardsComponent {
  @Input() totalImages: number = 0;
  @Input() images: string[] = [];
  @Input() isLoading: boolean = false;
  @Input() imagesToShow: number = 5;

  get displayedImages() {
    return this.images.slice(0, this.imagesToShow);
  }

  get remainingImagesCount() {
    return this.totalImages - this.imagesToShow;
  }
}
