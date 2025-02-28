import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RickAndMortyService } from '../services/rick-n-morty.service';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrl: './character-detail.component.css',
})
export class CharacterDetailComponent {
  characterId = '';
  character: any = {};

  constructor(
    private route: ActivatedRoute,
    private rickAndMortyService: RickAndMortyService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.characterId = params['id'];
      this.fetchCharacter(+this.characterId);
    });
  }

  fetchCharacter(id: number) {
    // Fetch character by id
    this.rickAndMortyService.getCharacter(id).subscribe((data) => {
      this.character = data;
    });
  }

  goBack() {
    window.history.back();
  }
}
