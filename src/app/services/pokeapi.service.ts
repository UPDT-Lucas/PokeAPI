import { Injectable } from '@angular/core';
import { Pokedex } from '../pokeAPI/interfaces/pokedex.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Pokemon } from '../pokeAPI/interfaces/pokemon.interface';
import { Move } from '../pokeAPI/interfaces/move.interface';
import { Type } from '../pokeAPI/interfaces/type.interface'

@Injectable({
  providedIn: 'root'
})
export class PokeAPIService {

  constructor(private http: HttpClient) {}

  getPokedex(limit: string, offset: string): Observable<Pokedex | undefined> {
    const url = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`;
    return this.http.get<Pokedex>(url).pipe(
      catchError(error => {
        return of(undefined);
      })
    )
  }

  getPokemon(name: string): Observable<Pokemon | undefined> {
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
    return this.http.get<Pokemon>(url).pipe(
      catchError(error => {
        return of(undefined);
      })
    )
  }

  getMove(name: string): Observable<Move | undefined> {
    const url = `https://pokeapi.co/api/v2/move/${name}`;
    return this.http.get<Move>(url).pipe(
      catchError(error => {
        return of(undefined);
      })
    )
  }

  getType(name: string): Observable<Type | undefined> {
    const url = `https://pokeapi.co/api/v2/type/${name}`;
    return this.http.get<Type>(url).pipe(
      catchError(error => {
        return of(undefined)
      })
    )
  }
}
