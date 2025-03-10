import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RickAndMortyService } from '@services/rick-n-morty.service';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrl: './character-detail.component.css',
})
export class CharacterDetailComponent {
  characterId = '';
  character: any = {};
  origin: any = {};
  episodes: any = [];
  randomEpisode: any = {};

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

      this.randomEpisode = this.getRandomeEpisode();
      console.log(this.character);
      console.log(this.origin);
      console.log(this.episodes);
    });
  }

  goBack() {
    window.history.back();
  }

  async getRandomeEpisode() {
    // Fetch random episode
    console.log(
      this.episodes[Math.floor(Math.random() * this.episodes.length)]
    );
    this.rickAndMortyService
      .getEpisodeByURL(
        this.episodes[Math.floor(Math.random() * this.episodes.length)]
      )
      .subscribe((data) => {
        this.randomEpisode = data;
        console.log(this.randomEpisode);
      });
  }
}
