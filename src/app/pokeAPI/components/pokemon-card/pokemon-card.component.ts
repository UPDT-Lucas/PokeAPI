import { Component, Input } from '@angular/core';
import { Pokemon } from '../../interfaces/pokemon.interface';
import { RouterModule } from '@angular/router';
import { BadgeComponent } from '../../../shared/components/badge/badge.component';
import { ColorService } from '../../../shared/services/color.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [
    RouterModule,
    BadgeComponent,
    CommonModule
  ],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.css'
})
export class PokemonCardComponent {
  @Input()
  pokemon!: Pokemon;

  constructor(
    private colorService: ColorService) {}

  changeBadgeColor(type: string): string {
    return `rgb(${this.colorService.getColorByType(type)})`;
  }

  changeCardColor(type: string): string {
    return `rgba(${this.colorService.getColorByType(type)}, 0.3)`;
  }


}
