import { TestBed } from '@angular/core/testing';
import { MoviesState, MoviesStore } from './movies.store';
import { Movie } from '../interfaces/movie.interface';
import { MoviesService } from './movies.service';
import { of, skip, take, throwError } from 'rxjs';

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
      const movies: Movie[] = getFakeMovies();
      moviesStore.patchState({ movies });

      // Then
      moviesStore.movies$.pipe().subscribe({
        next: (movies: Movie[]) => {
          expect(movies.length).toBe(movies.length);
          done();
        },
      });
    });
  });

  describe('getMovies() method', () => {
    it('should update the state with the returned movies', (done: DoneFn) => {
      // Given
      const movies: Movie[] = getFakeMovies();
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
      const error: string = 'An error occurred';
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
});

export function getFakeMovies(): Movie[] {
  return [
    { title: 'Titanic' },
    { title: 'Harry Potter' },
    { title: 'Lord Of The Rings' },
  ];
}
