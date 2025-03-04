import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import {
  CarouselComponent,
  CarouselInnerComponent,
  CarouselItemComponent,
  SpinnerComponent,
  ThemeDirective,
} from '@coreui/angular';

import { RickAndMortyService } from '@services/rick-n-morty.service';
import { RouterLink } from '@angular/router';
import { IconComponent } from '@components/icon/icon.component';

@Component({
  selector: 'app-landing',
  imports: [
    ThemeDirective,
    CarouselComponent,
    CarouselInnerComponent,
    NgFor,
    CarouselItemComponent,
    CommonModule,
    RouterLink,
    SpinnerComponent,
    IconComponent,
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent implements OnInit {
  slides: any[] = [];
  currentSlide: number = 0;

  constructor(private rickAndMortyService: RickAndMortyService) {}

  async setSlides(data: any): Promise<void> {
    this.slides = data.results.map((character: any, index: number) => ({
      id: index,
      id_character: character.id,
      src: character.image,
      title: character.name,
      subtitle: character.status,
      type: character.species,
      loading: true,
    }));

    // console.log('Carousel slides', this.slides);
  }

  async ngOnInit(): Promise<void> {
    this.rickAndMortyService.getRandomPage().subscribe(async (data) => {
      await this.setSlides(data);
    });
  }

  async onItemChange($event: any): Promise<void> {
    this.currentSlide = $event;
  }

  onImageLoad(slide: any): void {
    slide.loading = false; // Cambia el estado de loading cuando la imagen se haya cargado
  }
}
