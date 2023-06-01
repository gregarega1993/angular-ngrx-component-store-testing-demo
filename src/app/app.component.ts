import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { Observable } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { MoviesStore } from './movies.store';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [MoviesStore],
  imports: [
    CommonModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  template: `
    <mat-form-field>
      <mat-label>Movie</mat-label>
      <input matInput [formControl]="movieControl" />
    </mat-form-field>
    <button
      mat-flat-button
      color="primary"
      (click)="addMovie(movieControl.value)"
    >
      Add movie
    </button>
    <mat-list role="list">
      <mat-list-item *ngFor="let movie of movies$ | async" role="listitem">
        {{ movie }}
      </mat-list-item>
    </mat-list>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  #formBuilder = inject(FormBuilder);
  #moviesStore = inject(MoviesStore);

  movieControl = this.#formBuilder.control('');
  movies$: Observable<string[]> = this.#moviesStore.movies$;

  ngOnInit() {
    this.#moviesStore.getMovies();
  }

  addMovie(movie: string | null) {
    if (movie) {
      this.#moviesStore.addMovie(movie);
    }
  }
}
