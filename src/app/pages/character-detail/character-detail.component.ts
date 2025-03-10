import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RickAndMortyService } from '@services/rick-n-morty.service';
import { Character } from '@typesApp/characterType';
import { getIdFromUrl } from '@utils/getIdFromUrl';
import { setCharactersWithLoading } from '@utils/setCharactersWithLoading';
import { CharacterItemComponent } from '@components/character-item/character-item.component';
import { randomizeArray } from '@utils/randomizeArray';

@Component({
  imports: [CommonModule, CharacterItemComponent],
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

      this.getRandomeEpisode();
      console.log(this.character);
      console.log(this.origin);
      console.log(this.episodes);
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
        this.randomEpisode = data;
        this.charactersFromRandomEpisode = data.characters;
        this.characterIds = this.charactersFromRandomEpisode.map(
          (url: string) => getIdFromUrl(url)
        );

        this.getAllCharactersFromEpisode(); // Fetch all characters from episode
      });
  }

  // Fetch multiple characters
  async getAllCharactersFromEpisode() {
    // console.log(this.characterIds);
    this.rickAndMortyService
      .getMultipleCharacters(this.characterIds)
      .subscribe((data) => {
        // console.log(data); // Array of characters
        // Randomize the order of characters
        const shuffledData = randomizeArray(data);
        this.allCharactersFromEpisode = setCharactersWithLoading(shuffledData);
      });
  }
}
