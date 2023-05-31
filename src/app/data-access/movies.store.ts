import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable, exhaustMap } from 'rxjs';

import { Movie } from '../interfaces/movie.interface';
import { MoviesService } from './movies.service';

export interface MoviesState {
  movies: Movie[];
  moviesError: string | null;
}

@Injectable()
export class MoviesStore extends ComponentStore<MoviesState> {
  readonly movies$: Observable<Movie[]> = this.select((state) => state.movies);

  constructor(private moviesService: MoviesService) {
    super({ movies: [], moviesError: null });
  }

  readonly getMovies = this.effect<void>((trigger$) =>
    trigger$.pipe(
      exhaustMap(() =>
        this.moviesService.getMovies().pipe(
          tapResponse(
            (movies: Movie[]) => this.patchState({ movies }),
            (error: HttpErrorResponse) =>
              this.patchState({ moviesError: error.message })
          )
        )
      )
    )
  );
}
