import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Pokemon, PokemonResults } from '../../interfaces/pokemon.interfaces';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { EMPTY, Observable, catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.css'
})
export class PokemonComponent implements OnInit {

  public PokemonResults$!: Observable<PokemonResults>;
  public errorMessages!: string;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.PokemonResults$ = this.apiService.getAllPokemon().pipe(
      catchError((error: string) => {
        this.errorMessages = error;
        return EMPTY;
      }))
  }
}
