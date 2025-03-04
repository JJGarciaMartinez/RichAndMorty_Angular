import { CommonModule, NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '@components/icon/icon.component';
import {
  CarouselComponent,
  CarouselInnerComponent,
  CarouselItemComponent,
  SpinnerComponent,
  ThemeDirective,
} from '@coreui/angular';

@Component({
  selector: 'app-carousel-landing',
  imports: [
    ThemeDirective,
    CarouselComponent,
    CarouselInnerComponent,
    NgFor,
    CarouselItemComponent,
    IconComponent,
    SpinnerComponent,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './carousel-landing.component.html',
  styleUrl: './carousel-landing.component.css',
})
export class CarouselLandingComponent {
  @Input() slides: any[] = [];
  currentSlide: number = 0;

  async onItemChange($event: any): Promise<void> {
    this.currentSlide = $event;
  }

  onImageLoad(slide: any): void {
    slide.loading = false; // Cambia el estado de loading cuando la imagen se haya cargado
  }
}
