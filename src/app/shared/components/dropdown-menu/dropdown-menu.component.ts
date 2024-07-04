import { Component, Input, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'shared-dropdown-menu',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './dropdown-menu.component.html',
  styleUrl: './dropdown-menu.component.css'
})
export class DropdownMenuComponent {

  @Input()
  menuItems: {icon: string, text: string, ref: string}[] = [];

  @Input()
  icon: string = "menu";

  @ViewChild('menu')
  menu!: ElementRef;

  @ViewChild('toggle')
  toggle!: ElementRef;

  isOpened: boolean = false;

  constructor(private renderer: Renderer2) {
    this.renderer.listen('window', 'click', (e:Event) => {
      if(!this.menu) return;
      if(!this.menu.nativeElement.contains(e.target) && !this.toggle.nativeElement.contains(e.target)) {
          this.isOpened=false;
      }
    });
  }

  toggleMenu(){
    this.isOpened = !this.isOpened;
  }

}
