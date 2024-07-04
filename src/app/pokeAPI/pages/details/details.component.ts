import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { DropdownMenuComponent } from '../../../shared/components/dropdown-menu/dropdown-menu.component';
import { ColorService } from '../../../shared/services/color.service';
import { BadgeComponent } from '../../../shared/components/badge/badge.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PokeAPIService } from '../../../services/pokeapi.service';
import { Ability, Pokemon } from '../../interfaces/pokemon.interface';
import { Move } from '../../interfaces/move.interface';
import { Type, Generation } from '../../interfaces/type.interface';
import { CommonModule } from '@angular/common';
import tinycolor from 'tinycolor2';
import { forkJoin } from 'rxjs';
import { StatBarComponent } from '../../components/stat-bar/stat-bar.component';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    HeaderComponent,
    DropdownMenuComponent,
    BadgeComponent,
    ButtonComponent,
    CommonModule,
    StatBarComponent,
    RouterModule
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {

  menuItems: {icon: string, text: string, ref: string }[] =
  [
    { icon: "add_circle", text: "Add on team", ref: "" },
  ];
  headers: string [] = [ "Type", "Name" ];
  selectedPokemon: Pokemon | undefined;
  moves: Move[] = [];
  abilities: Ability[] = [];
  results: any [] = [];
  damageFromx2: Generation[] = [];
  damageFromx4: Generation[] = [];
  damageTox2: Generation[] = [];
  damageTox4: Generation[] = [];

  isStatsActive: boolean = true;
  isAbilitiesAcive: boolean = false;
  isMovesActive: boolean = false;
  isDamagesActive: boolean = false;

  constructor(
    private colorService: ColorService,
    private route: ActivatedRoute,
    private pokeAPIService: PokeAPIService) {}

  ngOnInit(){
    this.colorService.updateBackgroundColor();
    this.route.params.subscribe(params => {
      this.getPokemon(params["id"]);
    });
  }

  getPokemon(id: string) {
    this.pokeAPIService.getPokemon(id).subscribe(
      pokemon => {
        this.selectedPokemon = pokemon;
        if(this.isMovesActive){
          this.getMoves()
        }else{
          if(this.isDamagesActive){
            this.getDamages()
          }
        }
      }
    );
   }

   getStats(){
    if(!this.isStatsActive){
      this.isStatsActive = true;
      this.isMovesActive = false;
      this.isDamagesActive = false;
      this.isAbilitiesAcive = false;
    }
     this.results = [];
   }

   getAbilities(){
    if(!this.isAbilitiesAcive){
      this.isAbilitiesAcive = true;
      this.isMovesActive = false;
      this.isDamagesActive = false;
      this.isStatsActive = false;
    }
    this.results = [];
   }

   getMoves(){
    if(!this.isMovesActive){
      this.isMovesActive = true;
      this.isAbilitiesAcive = false;
      this.isDamagesActive = false;
      this.isStatsActive = false;
    }
    this.results = [];
    this.selectedPokemon?.moves.forEach(
      move => {
        this.pokeAPIService.getMove(move.move.name).subscribe(
          moveResult => {
            this.results.push(moveResult!);
          }
        )
      }
    )
   }

   getDamages(){
    if(!this.isDamagesActive){
      this.isDamagesActive = true;
      this.isAbilitiesAcive = false;
      this.isMovesActive = false;
      this.isStatsActive = false;
    }
    const observables = this.selectedPokemon?.types.map((type) =>
    this.pokeAPIService.getType(type.type.name))
    forkJoin(observables!).subscribe(
      observablesResult => {
        this.results = [];
        this.separateDamageRelations(observablesResult);
      }
    )
   }

   separateDamageRelations(results: (Type | undefined)[]){
    if(results.length===1){
      this.damageFromx2 = results[0]?.damage_relations.double_damage_from!;
      this.damageTox2 = results[0]?.damage_relations.double_damage_to!;
    }else{
      this.damageFromx4 = results[0]?.damage_relations.double_damage_from.filter(
        type1 => results[1]?.damage_relations.double_damage_from
          .some(type2 => type1.name === type2.name)
      )!;
      const damageFromx2Type1 = results[0]?.damage_relations.double_damage_from.filter(
        type1 => this.damageFromx4
        .every(type2 => type1.name !== type2.name)
      )
      const damageFromx2Type2 = results[1]?.damage_relations.double_damage_from.filter(
        type1 => this.damageFromx4
        .every(type2 => type1.name !== type2.name))

      this.damageTox4 = results[0]?.damage_relations.double_damage_to.filter(
        type1 => results[1]?.damage_relations.double_damage_to
          .some(type2 => type1.name === type2.name)
      )!;
      const damageTox2Type1 = results[0]?.damage_relations.double_damage_to.filter(
        type1 => this.damageTox4
        .every(type2 => type1.name !== type2.name)
      )
      const damageTox2Type2 = results[1]?.damage_relations.double_damage_to.filter(
        type1 => this.damageTox4
        .every(type2 => type1.name !== type2.name))

      this.damageFromx2 = damageFromx2Type1!.concat(damageFromx2Type2!);
      this.damageTox2 = damageTox2Type1!.concat(damageTox2Type2!);
    }
   }

  changeBadgeColor(type: string): string {
    return `rgb(${this.colorService.getColorByType(type)})`;
  }

  getTypeMoveColor(type: string): string{
    return `rgb(${this.colorService.getColorByType(type)})`
  }

  getTextColor(type: string): string {
    const color = `rgb(${this.colorService.getColorByType(type)})`;
    const originalColor = tinycolor(color);
    const darkerColor = originalColor.darken(35).toString();
    return darkerColor;
  }

  getPokemonNumber(addNumber: number): string {
    if(this.selectedPokemon!.id + addNumber >= 1 &&
      this.selectedPokemon!.id + addNumber <= 1025){
        return (this.selectedPokemon!.id + addNumber).toString()
      }
      return (this.selectedPokemon!.id.toString());
  }

}
