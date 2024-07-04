import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  standalone: true,
  imports: [],
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent {
  @Input()
  public icon: string = "";

  @Input()
  public placeholder: string = "";

  @Output()
  public onValue = new EventEmitter<string>();

  onEnter(event: Event){
    const searchedValue = (event.target as HTMLInputElement).value;
     this.onValue.emit(searchedValue);
  }

}
