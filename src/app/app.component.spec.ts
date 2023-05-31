import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MoviesStore } from './data-access/movies.store';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  const mockMoviesStore = jasmine.createSpyObj('MoviesStore', ['getMovies']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppComponent],
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
    })
  })
});
