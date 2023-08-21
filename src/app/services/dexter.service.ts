import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DexterService {

  
  private Pokeapi = "https://pokeapi.co/api/v2/"; // URL to web api

  constructor(private http: HttpClient) {}

  public getPokemons(): Observable<object>{
    return this.http.get(this.Pokeapi+"pokemon/");
  }
  public getPokemon(pokemon: String): Observable<object>{
    return this.http.get(this.Pokeapi+"pokemon/"+pokemon);
  }
}
