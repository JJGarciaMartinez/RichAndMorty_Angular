import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RickAndMortyService } from '@services/rick-n-morty.service';
import { CarouselLandingComponent } from '@components/carousel-landing/carousel-landing.component';
import { LoaderSpinnerComponent } from '@components/loader-spinner/loader-spinner.component';
import { HeroComponent } from '@components/hero/hero.component';
import { SocialsLandingComponent } from '@components/socials-landing/socials-landing.component';

import { RouterLink } from '@angular/router';
import { SmallCardsComponent } from '@components/small-cards/small-cards.component';
import { Character, Episode, InfoData, Location } from '@typesApp/interfacesRM';
import { map, Observable, shareReplay } from 'rxjs';

@Component({
  selector: 'app-landing',
  imports: [
    CommonModule,
    CarouselLandingComponent,
    LoaderSpinnerComponent,
    HeroComponent,
    SocialsLandingComponent,
    RouterLink,
    SmallCardsComponent,
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent implements OnInit {
  slides: any[] = [];
  isLoading = false;

  infoCharacters$: Observable<InfoData> = new Observable<InfoData>();
  characters$: Observable<Character[]> = new Observable<Character[]>();
  characterImages$: Observable<string[]> = new Observable<string[]>();

  infoEpisodes$: Observable<InfoData> = new Observable<InfoData>();
  episodes$: Observable<Episode[]> = new Observable<Episode[]>();

  infoLocations$: Observable<InfoData> = new Observable<InfoData>();
  locations$: Observable<Location[]> = new Observable<Location[]>();

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

  ngOnInit(): void {
    this.isLoading = true;
    this.rickAndMortyService.getRandomPage().subscribe(async (data) => {
      if (!data.ok) {
        this.isLoading = false;
      }
      await this.setSlides(data);
      this.isLoading = false;
    });

    const charactersResponse$ = this.rickAndMortyService.getCharacters().pipe(
      shareReplay(1) // Cache the response to prevent multiple HTTP requests
    );

    this.characters$ = charactersResponse$.pipe(map(({ results }) => results));
    this.infoCharacters$ = charactersResponse$.pipe(map(({ info }) => info));
    this.characterImages$ = charactersResponse$.pipe(
      map(({ results }) => results.map((character) => character.image))
    );

    const episodesResponse$ = this.rickAndMortyService
      .getAllEpisodes()
      .pipe(shareReplay(1));
    this.episodes$ = episodesResponse$.pipe(map(({ results }) => results));
    this.infoEpisodes$ = episodesResponse$.pipe(map(({ info }) => info));

    const locationsResponse$ = this.rickAndMortyService
      .getAllLocations()
      .pipe(shareReplay(1));
    this.locations$ = locationsResponse$.pipe(map(({ results }) => results));
    this.infoLocations$ = locationsResponse$.pipe(map(({ info }) => info));
  }
}
