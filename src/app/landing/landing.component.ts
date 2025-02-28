import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import {
  CarouselCaptionComponent,
  CarouselComponent,
  CarouselInnerComponent,
  CarouselItemComponent,
  ThemeDirective,
} from '@coreui/angular';

import { RickAndMortyService } from '@services/rick-n-morty.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing',
  imports: [
    ThemeDirective,
    CarouselComponent,
    CarouselInnerComponent,
    NgFor,
    CarouselItemComponent,
    CarouselCaptionComponent,
    CommonModule,
    RouterLink,
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
      src: character.image,
      title: character.name,
      subtitle: character.status,
    }));

    // console.log('Carousel slides', this.slides);
  }

  async ngOnInit(): Promise<void> {
    this.rickAndMortyService.getCharacters().subscribe(async (data) => {
      await this.setSlides(data);
    });
  }

  async onItemChange($event: any): Promise<void> {
    this.currentSlide = $event;
  }
}
