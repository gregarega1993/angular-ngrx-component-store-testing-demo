import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

import { MoviesStore } from './movies.store';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  const mockMoviesStore = jasmine.createSpyObj('MoviesStore', [
    'getMovies',
    'addMovie',
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppComponent, BrowserAnimationsModule],
    });
    TestBed.overrideProvider(MoviesStore, { useValue: mockMoviesStore });
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit() lifecycle hook', () => {
    it('should call the moviesStore.getMovies() method', () => {
      component.ngOnInit();
      expect(mockMoviesStore.getMovies).toHaveBeenCalled();
    });
  });

  describe('addMovie() method', () => {
    it('should call the moviesStore.addMovie() method with value from the form control', () => {
      const movie = 'Fake movie title';
      component.addMovie(movie);
      expect(mockMoviesStore.addMovie).toHaveBeenCalledWith(movie);
    });
  });

  describe('When the Add movie button is clicked', () => {
    it('the addMovie() method should be called', () => {
      // Given
      spyOn(component, 'addMovie');
      const movie = 'Fake movie title';
      component.movieControl.patchValue(movie);
      const addMovieButton = fixture.debugElement.query(By.css('button'));
      // When
      addMovieButton.nativeElement.click();
      // Then
      expect(component.addMovie).toHaveBeenCalledWith(movie);
    });
  });
});
