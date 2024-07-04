import { Component} from '@angular/core';
import { DropdownMenuComponent } from '../dropdown-menu/dropdown-menu.component';
import { RouterModule } from '@angular/router';
import { ColorService } from '../../services/color.service';

@Component({
  selector: 'shared-header',
  standalone: true,
  imports: [DropdownMenuComponent, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private colorService: ColorService) {}

  menuItems: {icon: string, text: string, ref: string }[] =
  [
    { icon: "search", text: "Pokedex", ref: "/pokedex" },
    { icon: "computer", text: "Team", ref: "/team" },
    { icon: "person", text: "Login", ref: "" }
  ];

  // ngOnInit(){
  //   this.changeColor();
  // }

  // changeColor(){
  //   this.colorService.changeColor("fairy")
  // }

}
