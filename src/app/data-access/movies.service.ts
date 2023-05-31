import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Movie } from '../interfaces/movie.interface';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  getMovies(): Observable<Movie[]> {
    return of([
      { title: 'Titanic' },
      { title: 'Harry Potter' },
      { title: 'Lord Of The Rings' },
    ]);
  }
}
