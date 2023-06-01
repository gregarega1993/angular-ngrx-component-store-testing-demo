import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable, exhaustMap } from 'rxjs';

import { MoviesService } from './movies.service';

export interface MoviesState {
  movies: string[];
  moviesError: string | null;
}

@Injectable()
export class MoviesStore extends ComponentStore<MoviesState> {
  readonly movies$: Observable<string[]> = this.select((state) => state.movies);

  constructor(private moviesService: MoviesService) {
    super({ movies: [], moviesError: null });
  }

  readonly getMovies = this.effect<void>((trigger$) =>
    trigger$.pipe(
      exhaustMap(() =>
        this.moviesService.getMovies().pipe(
          tapResponse(
            (movies: string[]) => this.patchState({ movies }),
            (error: HttpErrorResponse) =>
              this.patchState({ moviesError: error.message })
          )
        )
      )
    )
  );

  readonly addMovie = this.updater((state, movie: string) => ({
    ...state,
    movies: [...state.movies, movie],
  }));
}
