import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RickAndMortyService } from '@services/rick-n-morty.service';
import { CarouselLandingComponent } from '@components/carousel-landing/carousel-landing.component';
import { LoaderSpinnerComponent } from '@components/loader-spinner/loader-spinner.component';
import { HeroComponent } from '@components/hero/hero.component';
import { SocialsLandingComponent } from '@components/socials-landing/socials-landing.component';

@Component({
  selector: 'app-landing',
  imports: [
    CommonModule,
    CarouselLandingComponent,
    LoaderSpinnerComponent,
    HeroComponent,
    SocialsLandingComponent,
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent implements OnInit {
  slides: any[] = [];
  isLoading = false;

  constructor(private rickAndMortyService: RickAndMortyService) {}

  async setSlides(data: any): Promise<void> {
    this.slides = data.results.map((character: any, index: number) => ({
      id: index,
      id_character: character.id,
      src: character.image,
      title: character.name,
      status: character.status,
      species: character.species,
      loading: true,
    }));

    // console.log('Carousel slides', this.slides);
  }

  async ngOnInit(): Promise<void> {
    this.isLoading = true;
    this.rickAndMortyService.getRandomPage().subscribe(async (data) => {
      if (!data.ok) {
        this.isLoading = false;
      }
      await this.setSlides(data);
      this.isLoading = false;
    });
  }
}
