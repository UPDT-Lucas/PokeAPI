import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports:
  [
    CommonModule,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PokeAPI';
}

/*
TODO: change page but not the details??
TODO: moves, types, abilities component

TODO: end the home
TODO: teams
TODO: login
TODO: mongo
*/
