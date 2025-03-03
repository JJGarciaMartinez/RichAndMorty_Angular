import { Routes } from '@angular/router';
import { CharacterDetailComponent } from '@pages/character-detail/character-detail.component';
import { CharacterListComponent } from '@pages/character-list/character-list.component';
import { EpisodesComponent } from '@pages/episodes/episodes.component';
import { LandingComponent } from '@pages/landing/landing.component';
import { LocationsComponent } from '@pages/locations/locations.component';

export const routes: Routes = [
  {
    path: 'characters',
    component: CharacterListComponent,
  },
  {
    path: 'characters/detail/:id',
    component: CharacterDetailComponent,
  },
  {
    path: 'locations',
    component: LocationsComponent,
  },
  {
    path: 'episodes',
    component: EpisodesComponent,
  },
  {
    path: '',
    component: LandingComponent,
  },
];
