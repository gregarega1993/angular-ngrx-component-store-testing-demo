import { TestBed } from '@angular/core/testing';
import { take } from 'rxjs';

import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoviesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return movies', (done: DoneFn) => {
    const expectedMovies: string[] = [
      'Titanic',
      'Harry Potter',
      'Lord Of The Rings',
    ];

    service
      .getMovies()
      .pipe(take(1))
      .subscribe((movies: string[]) => {
        expect(movies).toEqual(expectedMovies);
        done();
      });
  });
});
