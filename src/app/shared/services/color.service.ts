import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  homePokemon:
  { name: string, type: string, image: string } =
  { name: "", type: "", image: "" };

  constructor() {}

  changeColor(pokemonType: string): void {
    var root = document.querySelector(':root');
    var rootStyles = getComputedStyle(root!);
    document.documentElement.style.setProperty("--active", rootStyles.getPropertyValue(`--${pokemonType}`))
    document.documentElement.style.setProperty("--active-gradient1",rootStyles.getPropertyValue(`--${pokemonType}-gradient1`))
    document.documentElement.style.setProperty("--active-gradient2",rootStyles.getPropertyValue(`--${pokemonType}-gradient2`))
    document.documentElement.style.setProperty("--active-gradient3",rootStyles.getPropertyValue(`--${pokemonType}-gradient3`))
  }

  getActive(): string {
    var root = document.querySelector(':root');
    var rootStyles = getComputedStyle(root!);
    return rootStyles.getPropertyValue('--active');
  }

  getActiveGradient(): string {
    var root = document.querySelector(':root');
    var rootStyles = getComputedStyle(root!);
    return rootStyles.getPropertyValue('--active-gradient');
  }

  getColorByType(type: string): string {
    var root = document.querySelector(':root');
    var rootStyles = getComputedStyle(root!);
    return rootStyles.getPropertyValue(`--${type}`)
  }

  updateBackgroundColor(){
    const storedPokemon = sessionStorage.getItem("homePokemon");
    if (storedPokemon) {
      this.homePokemon = JSON.parse(storedPokemon);
      this.changeColor(this.homePokemon.type);
    }
  }

}
