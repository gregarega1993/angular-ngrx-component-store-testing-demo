import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  getMovies(): Observable<string[]> {
    return of(['Titanic', 'Harry Potter', 'Lord Of The Rings']);
  }
}
