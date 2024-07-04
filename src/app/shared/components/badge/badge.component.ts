import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import tinycolor from 'tinycolor2';

@Component({
  selector: 'shared-badge',
  standalone: true,
  imports: [],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.css'
})
export class BadgeComponent {
  @Input()
  color: string = "";

  @Input()
  text: string = "";

  getTextColor(): string {
    const originalColor = tinycolor(this.color);
    const darkerColor = originalColor.darken(40).toString();
    return darkerColor;
  }
}
