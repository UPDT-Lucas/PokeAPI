import { Component, Input } from '@angular/core';
import { Stat } from '../../interfaces/pokemon.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stat-bar',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './stat-bar.component.html',
  styleUrl: './stat-bar.component.css'
})
export class StatBarComponent {
  @Input()
  stat!: Stat;

  @Input()
  colorIndex: string = "";

  getBarColor(): string{
    if(this.colorIndex === "0"){
      return "#ff6767";
    }else if(this.colorIndex === "1"){
      return "#7bff67";
    }
    return "#6790ff";
  }
}
