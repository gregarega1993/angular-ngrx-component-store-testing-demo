import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { Observable } from 'rxjs';

import { MoviesStore } from './data-access/movies.store';
import { Movie } from './interfaces/movie.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [MoviesStore],
  imports: [CommonModule, MatListModule],
  template: `<mat-list role="list">
    <mat-list-item *ngFor="let movie of movies$ | async" role="listitem">
      {{ movie?.title }}
    </mat-list-item>
  </mat-list> `,
  styles: [],
})
export class AppComponent implements OnInit {
  #moviesStore = inject(MoviesStore);

  movies$: Observable<Movie[]> = this.#moviesStore.movies$;

  ngOnInit() {
    this.#moviesStore.getMovies();
  }
}
