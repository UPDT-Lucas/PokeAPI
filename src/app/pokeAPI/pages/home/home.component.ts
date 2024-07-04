import { Component, HostListener } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { PokeAPIService } from '../../../services/pokeapi.service';
import { ColorService } from '../../../shared/services/color.service';
import { NavigationStart, Router, Event, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  actualPokemonNumber: number = 0;
  homePokemon:
    { name: string, type: string, image: string } =
    { name: "", type: "", image: "" };


  constructor(
    private pokeAPIService: PokeAPIService,
    private colorService: ColorService,
    private router: Router) {}

      ngOnInit() {
        this.loadPokemon();
      }

      @HostListener('window:beforeunload', ['$event'])
      unloadHandler(event: Event) {
        sessionStorage.removeItem("homePokemon");
      }

      loadPokemon() {
        const storedPokemon = sessionStorage.getItem("homePokemon");
        if (storedPokemon) {
          this.homePokemon = JSON.parse(storedPokemon);
          this.colorService.changeColor(this.homePokemon.type);
        } else {
          const actualPokemonNumber = Math.floor(Math.random() * 1014 + 1);
          this.pokeAPIService.getPokemon(actualPokemonNumber.toString()).subscribe(
            pokemonResult => {
              const pokemonJSON = {
                name: pokemonResult?.name!,
                type: pokemonResult?.types[0].type.name!,
                image: pokemonResult?.sprites.other?.['official-artwork'].front_default!
              };
              sessionStorage.setItem("homePokemon", JSON.stringify(pokemonJSON));
              this.homePokemon = pokemonJSON;
              this.colorService.changeColor(this.homePokemon.type);
            }
          );
        }
      }
    }
