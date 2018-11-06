import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { MovieSearchComponent } from '../movie-search/movie-search.component';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../domain/movie';


describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let movieService;
  let getMoviesSpy;

  beforeEach(async(() => {
    movieService = jasmine.createSpyObj('MovieService', ['getMovies']);
    getMoviesSpy = movieService.getMovies.and.returnValue( of(Movie) );
    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        MovieSearchComponent
      ],
      imports: [
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        { provide: MovieService, useValue: movieService }
      ]
    })
    .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display "Top Movies" as headline', () => {
    expect(fixture.nativeElement.querySelector('h3').textContent).toEqual('Top Movies');
  });

  it('should call movieService', async(() => {
    expect(getMoviesSpy.calls.any()).toBe(true);
    }));

  it('should display 4 links', async(() => {
    expect(fixture.nativeElement.querySelectorAll('a').length).toEqual(4);
  }));

});
