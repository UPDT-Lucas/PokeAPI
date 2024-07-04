import { Routes } from '@angular/router';
import { HomeComponent } from './pokeAPI/pages/home/home.component';
import { PokedexComponent } from './pokeAPI/pages/pokedex/pokedex.component';
import { TeamComponent } from './pokeAPI/pages/team/team.component';
import { DetailsComponent } from './pokeAPI/pages/details/details.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'pokedex',
    component: PokedexComponent
  },
  {
    path: 'team',
    component: TeamComponent
  },
  {
    path: 'details/:id',
    component: DetailsComponent
  }
];
