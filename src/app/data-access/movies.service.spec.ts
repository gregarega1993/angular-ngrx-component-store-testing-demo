import { TestBed } from '@angular/core/testing';

import { MoviesService } from './movies.service';
import { Movie } from '../interfaces/movie.interface';

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
    const expectedMovies: Movie[] = [
      { title: 'Titanic' },
      { title: 'Harry Potter' },
      { title: 'Lord Of The Rings' },
    ];

    service.getMovies().subscribe((movies: Movie[]) => {
      expect(movies).toEqual(expectedMovies);
      done();
    });
  });
});
