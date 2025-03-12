import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  QueryList,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
// @ts-ignore
import Glide from '@glidejs/glide';
import { IconComponent } from '../icon/icon.component';
import { CarouselSlideDirective } from '@directives/carousel/carousel-slide.directive';

export type Slide = {
  image: string;
  title: string;
  description: string;
};

@Component({
  selector: 'app-carousel',
  imports: [CommonModule, IconComponent],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
})
export class CarouselComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() slides: Slide[] = [];
  @Input() showBullets = true;

  @ViewChild('glideElement') glideElement!: ElementRef;
  @ContentChildren(CarouselSlideDirective)
  slideItems!: QueryList<CarouselSlideDirective>;

  glide!: any;
  private glideInitialized = false;

  async ngAfterViewInit() {
    await new Promise((resolve) => setTimeout(resolve, 100));
    console.log('Inicializando Glide');
    await this.initGlide();
  }

  hasProjectedContent(): boolean {
    return this.slideItems && this.slideItems.length > 0;
  }

  async ngOnChanges(changes: SimpleChanges) {
    // Verificar específicamente cambios en slides
    if (changes['slides'] && changes['slides'].currentValue?.length > 0) {
      // Si el carrusel ya estaba inicializado, destruirlo primero
      if (this.glideInitialized) {
        this.destroyGlide();
      }

      // Dar tiempo para que el DOM se actualice
      await new Promise((resolve) => setTimeout(resolve, 150));
      await this.initGlide();
    }
  }

  async initGlide() {
    const hasCustomSlides = this.hasProjectedContent();
    const hasInputSlides = this.slides && this.slides.length > 0;

    // Verificación para evitar mezclar ambos enfoques
    if (hasCustomSlides && hasInputSlides) {
      console.error(
        'Error: No puedes usar simultáneamente [slides] y elementos proyectados con carouselSlide'
      );
      return;
    }

    // Verificación de que hay algo para mostrar
    if (!hasCustomSlides && !hasInputSlides) {
      console.log('No hay slides para mostrar en el carrusel');
      return;
    }

    if (this.glideElement && this.glideElement.nativeElement) {
      try {
        this.glide = new Glide(this.glideElement.nativeElement, {
          type: 'carousel',
          perView: 3,
          autoplay: 4000,
          breakpoints: {
            768: { perView: 2 },
            480: { perView: 1 },
          },
        }).mount();
        this.glideInitialized = true;
      } catch (error) {
        console.error('Error al inicializar Glide:', error);
      }
    } else {
      console.error('Elemento Glide no encontrado en el DOM');
    }
  }

  async destroyGlide() {
    if (this.glide) {
      try {
        this.glide.destroy();
        this.glideInitialized = false;
      } catch (error) {
        console.error('Error al destruir Glide:', error);
      }
    }
  }

  async ngOnDestroy() {
    await this.destroyGlide();
  }
}
