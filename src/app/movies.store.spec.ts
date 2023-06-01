import { TestBed } from '@angular/core/testing';
import { of, skip, take, throwError } from 'rxjs';

import { MoviesState, MoviesStore } from './movies.store';
import { MoviesService } from './movies.service';

describe('MoviesStore', () => {
  let moviesStore: MoviesStore;
  let moviesServiceSpy: jasmine.SpyObj<MoviesService>;

  beforeEach(() => {
    const moviesServiceSpyObj = jasmine.createSpyObj('MoviesService', [
      'getMovies',
    ]);

    TestBed.configureTestingModule({
      providers: [
        MoviesStore,
        { provide: MoviesService, useValue: moviesServiceSpyObj },
      ],
    });

    moviesStore = TestBed.inject(MoviesStore);
    moviesServiceSpy = TestBed.inject(
      MoviesService
    ) as jasmine.SpyObj<MoviesService>;
  });

  it('should be created', () => {
    expect(moviesStore).toBeTruthy();
  });

  describe('movies$ selector', () => {
    it('should return movies from state', (done: DoneFn) => {
      // Given
      const movies: string[] = getFakeMovies();
      moviesStore.patchState({ movies });

      // Then
      moviesStore.movies$.pipe().subscribe({
        next: (movies: string[]) => {
          expect(movies.length).toBe(movies.length);
          done();
        },
      });
    });
  });

  describe('getMovies() method', () => {
    it('should update the state with the returned movies', (done: DoneFn) => {
      // Given
      const movies: string[] = getFakeMovies();
      moviesServiceSpy.getMovies.and.returnValue(of(movies));

      // Then
      moviesStore.state$.pipe(skip(1), take(1)).subscribe({
        next: (state: MoviesState) => {
          expect(state.movies).toEqual(movies);
          done();
        },
      });

      // When
      moviesStore.getMovies();
    });

    it('should update the state with an error message if an error occurs', (done: DoneFn) => {
      // Given
      const error = 'An error occurred';
      moviesServiceSpy.getMovies.and.returnValue(
        throwError(() => new Error(error))
      );

      // Then
      moviesStore.state$.pipe(skip(1), take(1)).subscribe({
        next: (state: MoviesState) => {
          expect(state.moviesError).toEqual(error);
          done();
        },
      });

      // When
      moviesStore.getMovies();
    });
  });

  describe('addMovie() method', () => {
    it('should update the movies state with the added movie', (done: DoneFn) => {
      // Given
      const movie = 'Fake movie title';

      // Then
      moviesStore.state$.pipe(skip(1), take(1)).subscribe({
        next: (state: MoviesState) => {
          expect(state.movies).toEqual([movie]);
          done();
        },
      });

      // When
      moviesStore.addMovie(movie);
    });
  });
});

export function getFakeMovies(): string[] {
  return ['Titanic', 'Harry Potter', 'Lord Of The Rings'];
}
