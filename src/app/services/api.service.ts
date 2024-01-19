import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { Pokemon, PokemonResults } from '../interfaces/pokemon.interfaces';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  url = 'https://pokeapi.co/api/v2/pokemon?limit=5&offset=0';
  // 'https://pokeapi.co/api/v2/pokemon?limit=151'

  //obtener todos los pokemon
  getAllPokemon(): Observable<PokemonResults>{
    return this.http.get<PokemonResults>(`${environment.apiUrl}pokemon?limit=5&offset=0`);
  }

}
