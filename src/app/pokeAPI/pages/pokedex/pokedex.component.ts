import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { DropdownMenuComponent } from '../../../shared/components/dropdown-menu/dropdown-menu.component';
import { BadgeComponent } from '../../../shared/components/badge/badge.component';
import { RouterModule } from '@angular/router';
import { PokeAPIService } from '../../../services/pokeapi.service';
import { Pokedex } from '../../interfaces/pokedex.interface';
import { Pokemon } from '../../interfaces/pokemon.interface';
import { ColorService } from '../../../shared/services/color.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CommonModule } from '@angular/common';
import { SearchBoxComponent } from '../../../shared/components/search-box/search-box.component';
import { PokemonCardComponent } from '../../components/pokemon-card/pokemon-card.component';

@Component({
  selector: 'app-pokedex',
  standalone: true,
  imports: [
    HeaderComponent,
    DropdownMenuComponent,
    BadgeComponent,
    RouterModule,
    InfiniteScrollModule,
    CommonModule,
    SearchBoxComponent,
    PokemonCardComponent
  ],
  templateUrl: './pokedex.component.html',
  styleUrl: './pokedex.component.css'
})
export class PokedexComponent {

  public menuItems: {icon: string, text: string, ref: string }[] =
  [
    { icon: "info", text: "Details", ref: "/details" },
    { icon: "add_circle", text: "Add on team", ref: "" },
  ];
  public pokedex: Pokedex | undefined;
  public pokemonList: Pokemon[] = [];
  public actualOffset: number = 0;
  public searchedPokemon: Pokemon | undefined;

  constructor(
    private pokeAPIService: PokeAPIService,
    private colorService: ColorService) {}

  ngOnInit(){
    this.getPokedex(30, 0)
    this.colorService.updateBackgroundColor();
  }

  getPokedex(results: number, offset: number){
    this.pokeAPIService.getPokedex(results.toString(), (offset*results).toString()).subscribe(
      pokedexResult => {
        const pokemons = pokedexResult?.results
        var counter: number = 0;
        pokemons?.forEach(pokemon => {
          this.pokeAPIService.getPokemon(pokemon.name).subscribe(
            pokemonResult => {
              this.pokemonList?.push(pokemonResult!);
              counter++;
            }
          )
        })
        this.actualOffset++;
      }
    );
  }

  onScroll() {
    this.getPokedex(30, this.actualOffset)
  }

  searchPokemonByName(name: string){
    if(name){
      this.pokeAPIService.getPokemon(name.toLowerCase()).subscribe(
        pokemonResult => {
          this.searchedPokemon = pokemonResult;
        }
      )
    }
    this.searchedPokemon = undefined;
  }
}

