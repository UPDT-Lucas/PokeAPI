import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { BadgeComponent } from '../../../shared/components/badge/badge.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { ColorService } from '../../../shared/services/color.service';
import { RouterModule } from '@angular/router';

register();

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [HeaderComponent, BadgeComponent, ButtonComponent, RouterModule],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class TeamComponent {

  slides = [
    "/assets/images/gengar.png",
    "/assets/images/gengar.png",
    "/assets/images/gengar.png",
    "/assets/images/gengar.png",
    "/assets/images/gengar.png",
    "/assets/images/gengar.png",
  ]

  constructor (private colorService: ColorService){}

  ngOnInit() {
    this.colorService.updateBackgroundColor();
  }

  getColor(): string{
    return `rgb(${this.colorService.getActive()})`;
  }

  getBackgroundColor(): string{
    return `rgba(${this.colorService.getActive()}, 0.3)`;
  }

}
