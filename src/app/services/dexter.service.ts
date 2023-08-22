import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { PokemonListResponse } from '../models/pokeList';
import { PokemonDetails } from '../models/pokeData';

@Injectable({
  providedIn: 'root'
})
export class DexterService {

  
  private Pokeapi = "https://pokeapi.co/api/v2/"; // URL to web api

  constructor(private http: HttpClient) {}

  public getPokemons(): Observable<PokemonListResponse>{
    return this.http.get<PokemonListResponse>(this.Pokeapi+"pokemon/");
  }
  public getPokemon(pokemon: String): Observable<PokemonDetails>{
    return this.http.get<PokemonDetails>(this.Pokeapi+"pokemon/"+pokemon);
  }
}
