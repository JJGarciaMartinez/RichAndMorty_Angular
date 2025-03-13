import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RickAndMortyService } from '@services/rick-n-morty.service';
import { Character } from '@typesApp/characterType';
import { getIdFromUrl } from '@utils/getIdFromUrl';
import { setCharactersWithLoading } from '@utils/setCharactersWithLoading';
import { CharacterItemComponent } from '@components/character-item/character-item.component';
import { randomizeArray } from '@utils/randomizeArray';
import { IconComponent } from '@components/icon/icon.component';
import {
  CarouselComponent,
  Slide,
} from '@components/carousel/carousel.component';
import { CarouselSlideDirective } from '@directives/carousel/carousel-slide.directive';

@Component({
  imports: [
    CommonModule,
    CharacterItemComponent,
    IconComponent,
    CarouselComponent,
    CarouselSlideDirective,
  ],
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrl: './character-detail.component.css',
})
export class CharacterDetailComponent {
  characterId = '';
  character: Character = {} as Character;
  origin: any = {};
  episodes: any = [];
  randomEpisode: any = {};
  charactersFromRandomEpisode: string[] = [];
  characterIds: number[] = [];
  allCharactersFromEpisode: Character[] = [];
  slides: Slide[] = [];

  constructor(
    private route: ActivatedRoute,
    private rickAndMortyService: RickAndMortyService
  ) {}

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe(async (params) => {
      this.characterId = params['id'];
      await this.fetchCharacter(+this.characterId);
    });
  }

  async fetchCharacter(id: number) {
    // Fetch character by id
    this.rickAndMortyService.getCharacter(id).subscribe((data) => {
      this.character = data;
      this.origin = data.origin;
      this.episodes = data.episode;

      this.getRandomeEpisode(); // Fetch random episode
    });
  }

  goBack() {
    window.history.back();
  }

  // Fetch random episode
  async getRandomeEpisode() {
    // console.log(this.episodes[Math.floor(Math.random() * this.episodes.length)]);
    this.rickAndMortyService
      .getEpisodeByURL(
        this.episodes[Math.floor(Math.random() * this.episodes.length)]
      )
      .subscribe((data) => {
        // Preparar todos los datos antes de actualizar propiedades
        const episodeData = data;
        const characters = data.characters;
        const ids = characters.map((url: string) => getIdFromUrl(url));

        // Actualizar todo de una vez para minimizar renderizados
        this.randomEpisode = episodeData;
        this.charactersFromRandomEpisode = characters;
        this.characterIds = ids;

        this.updateSlides(); // Update slides param with characters from episode
        this.getAllCharactersFromEpisode(ids); // Fetch all characters from episode
      });
  }

  // Fetch multiple characters
  async getAllCharactersFromEpisode(ids: number[]) {
    // console.log(this.characterIds);
    this.rickAndMortyService.getMultipleCharacters(ids).subscribe((data) => {
      // console.log(data); // Array of characters
      // Randomize the order of characters
      const shuffledData = randomizeArray(data);
      this.allCharactersFromEpisode = setCharactersWithLoading(shuffledData);
      this.updateSlides();
    });
  }

  // Update slides with characters from episode
  private updateSlides() {
    this.slides = this.allCharactersFromEpisode.map((character) => ({
      image: character.image,
      title: character.name,
      description: character.status,
    }));
  }
}
