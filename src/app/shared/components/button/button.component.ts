import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  @Input()
  color: string = "";

  @Input()
  hoverColor: string = "";

  @Input()
  text: string = "";

  @Input()
  bordered: boolean = false;

  hover: string = "";

  onHover() {
    this.hover = this.hoverColor;
  }

  onMouseOut(){
    if(this.bordered){
      this.hover = "white"
    }else {
      this.hover = "transparent"
    }
  }
}
