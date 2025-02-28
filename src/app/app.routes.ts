import { Routes } from '@angular/router';
import { CharacterDetailComponent } from './character-detail/character-detail.component';
import { CharacterListComponent } from './character-list/character-list.component';
import { LandingComponent } from '@landing/landing.component';

export const routes: Routes = [
  {
    path: 'characters',
    component: CharacterListComponent,
  },
  {
    path: 'detail/:id',
    component: CharacterDetailComponent,
  },
  {
    path: '',
    component: LandingComponent,
  },
];
