'use strict'; // necessary for es6 output in node

import { browser, element, by, ElementFinder, ElementArrayFinder } from 'protractor';
import { promise } from 'selenium-webdriver';

const expectedH1 = 'Tour of Movies';
const expectedTitle = `${expectedH1}`;
const targetMovie = { id: 15, name: 'Magneta' };
const targetMovieDashboardIndex = 3;
const nameSuffix = 'X';
const newMovieName = targetMovie.name + nameSuffix;

class Movie {
  id: number;
  name: string;

  // Factory methods

  // Movie from string formatted as '<id> <name>'.
  static fromString(s: string): Movie {
    return {
      id: +s.substr(0, s.indexOf(' ')),
      name: s.substr(s.indexOf(' ') + 1),
    };
  }

  // Movie from movie list <li> element.
  static async fromLi(li: ElementFinder): Promise<Movie> {
      let stringsFromA = await li.all(by.css('a')).getText();
      let strings = stringsFromA[0].split(' ');
      return { id: +strings[0], name: strings[1] };
  }

  // Movie id and name from the given detail element.
  static async fromDetail(detail: ElementFinder): Promise<Movie> {
    // Get movie id from the first <div>
    let _id = await detail.all(by.css('div')).first().getText();
    // Get name from the h2
    let _name = await detail.element(by.css('h2')).getText();
    return {
        id: +_id.substr(_id.indexOf(' ') + 1),
        name: _name.substr(0, _name.lastIndexOf(' '))
    };
  }
}

describe('Tutorial part 6', () => {

  beforeAll(() => browser.get(''));

  function getPageElts() {
    let navElts = element.all(by.css('app-root nav a'));

    return {
      navElts: navElts,

      appDashboardHref: navElts.get(0),
      appDashboard: element(by.css('app-root app-dashboard')),
      topMovies: element.all(by.css('app-root app-dashboard > div h4')),

      appMoviesHref: navElts.get(1),
      appMovies: element(by.css('app-root app-movies')),
      allMovies: element.all(by.css('app-root app-movies li')),
      selectedMovieSubview: element(by.css('app-root app-movies > div:last-child')),

      movieDetail: element(by.css('app-root app-movie-detail > div')),

      searchBox: element(by.css('#search-box')),
      searchResults: element.all(by.css('.search-result li'))
    };
  }

  describe('Initial page', () => {

    it(`has title '${expectedTitle}'`, () => {
      expect(browser.getTitle()).toEqual(expectedTitle);
    });

    it(`has h1 '${expectedH1}'`, () => {
        expectHeading(1, expectedH1);
    });

    const expectedViewNames = ['Dashboard', 'Movies'];
    it(`has views ${expectedViewNames}`, () => {
      let viewNames = getPageElts().navElts.map((el: ElementFinder) => el.getText());
      expect(viewNames).toEqual(expectedViewNames);
    });

    it('has dashboard as the active view', () => {
      let page = getPageElts();
      expect(page.appDashboard.isPresent()).toBeTruthy();
    });

  });

  describe('Dashboard tests', () => {

    beforeAll(() => browser.get(''));

    it('has top movies', () => {
      let page = getPageElts();
      expect(page.topMovies.count()).toEqual(4);
    });

    it(`selects and routes to ${targetMovie.name} details`, dashboardSelectTargetMovie);

    it(`updates movie name (${newMovieName}) in details view`, updateMovieNameInDetailView);

    it(`cancels and shows ${targetMovie.name} in Dashboard`, () => {
      element(by.buttonText('go back')).click();
      browser.waitForAngular(); // seems necessary to gets tests to pass for toh-pt6

      let targetMovieElt = getPageElts().topMovies.get(targetMovieDashboardIndex);
      expect(targetMovieElt.getText()).toEqual(targetMovie.name);
    });

    it(`selects and routes to ${targetMovie.name} details`, dashboardSelectTargetMovie);

    it(`updates movie name (${newMovieName}) in details view`, updateMovieNameInDetailView);

    it(`saves and shows ${newMovieName} in Dashboard`, () => {
      element(by.buttonText('save')).click();
      browser.waitForAngular(); // seems necessary to gets tests to pass for toh-pt6

      let targetMovieElt = getPageElts().topMovies.get(targetMovieDashboardIndex);
      expect(targetMovieElt.getText()).toEqual(newMovieName);
    });

  });

  describe('Movies tests', () => {

    beforeAll(() => browser.get(''));

    it('can switch to Movies view', () => {
      getPageElts().appMoviesHref.click();
      let page = getPageElts();
      expect(page.appMovies.isPresent()).toBeTruthy();
      expect(page.allMovies.count()).toEqual(10, 'number of movies');
    });

    it('can route to movie details', async () => {
      getMovieLiEltById(targetMovie.id).click();

      let page = getPageElts();
      expect(page.movieDetail.isPresent()).toBeTruthy('shows movie detail');
      let movie = await Movie.fromDetail(page.movieDetail);
      expect(movie.id).toEqual(targetMovie.id);
      expect(movie.name).toEqual(targetMovie.name.toUpperCase());
    });

    it(`updates movie name (${newMovieName}) in details view`, updateMovieNameInDetailView);

    it(`shows ${newMovieName} in Movies list`, () => {
      element(by.buttonText('save')).click();
      browser.waitForAngular();
      let expectedText = `${targetMovie.id} ${newMovieName}`;
      expect(getMovieAEltById(targetMovie.id).getText()).toEqual(expectedText);
    });

    it(`deletes ${newMovieName} from Movies list`, async () => {
      const moviesBefore = await toMovieArray(getPageElts().allMovies);
      const li = getMovieLiEltById(targetMovie.id);
      li.element(by.buttonText('x')).click();

      const page = getPageElts();
      expect(page.appMovies.isPresent()).toBeTruthy();
      expect(page.allMovies.count()).toEqual(9, 'number of movies');
      const moviesAfter = await toMovieArray(page.allMovies);
      // console.log(await Movie.fromLi(page.allMovies[0]));
      const expectedMovies =  moviesBefore.filter(h => h.name !== newMovieName);
      expect(moviesAfter).toEqual(expectedMovies);
      // expect(page.selectedMovieSubview.isPresent()).toBeFalsy();
    });

    it(`adds back ${targetMovie.name}`, async () => {
      const newMovieName = 'Alice';
      const moviesBefore = await toMovieArray(getPageElts().allMovies);
      const numMovies = moviesBefore.length;

      element(by.css('input')).sendKeys(newMovieName);
      element(by.buttonText('add')).click();

      let page = getPageElts();
      let moviesAfter = await toMovieArray(page.allMovies);
      expect(moviesAfter.length).toEqual(numMovies + 1, 'number of movies');

      expect(moviesAfter.slice(0, numMovies)).toEqual(moviesBefore, 'Old movies are still there');

      const maxId = moviesBefore[moviesBefore.length - 1].id;
      expect(moviesAfter[numMovies]).toEqual({id: maxId + 1, name: newMovieName});
    });

    it('displays correctly styled buttons', async () => {
      element.all(by.buttonText('x')).then(buttons => {
        for (const button of buttons) {
          // Inherited styles from styles.css
          expect(button.getCssValue('font-family')).toBe('Arial');
          expect(button.getCssValue('border')).toContain('none');
          expect(button.getCssValue('padding')).toBe('5px 10px');
          expect(button.getCssValue('border-radius')).toBe('4px');
          // Styles defined in movies.component.css
          expect(button.getCssValue('left')).toBe('194px');
          expect(button.getCssValue('top')).toBe('-32px');
        }
      });

      const addButton = element(by.buttonText('add'));
      // Inherited styles from styles.css
      expect(addButton.getCssValue('font-family')).toBe('Arial');
      expect(addButton.getCssValue('border')).toContain('none');
      expect(addButton.getCssValue('padding')).toBe('5px 10px');
      expect(addButton.getCssValue('border-radius')).toBe('4px');
    });

  });

  describe('Progressive movie search', () => {

    beforeAll(() => browser.get(''));

    it(`searches for 'Ma'`, async () => {
      getPageElts().searchBox.sendKeys('Ma');
      browser.sleep(1000);

      expect(getPageElts().searchResults.count()).toBe(4);
    });

    it(`continues search with 'g'`, async () => {
      getPageElts().searchBox.sendKeys('g');
      browser.sleep(1000);
      expect(getPageElts().searchResults.count()).toBe(2);
    });

    it(`continues search with 'e' and gets ${targetMovie.name}`, async () => {
      getPageElts().searchBox.sendKeys('n');
      browser.sleep(1000);
      let page = getPageElts();
      expect(page.searchResults.count()).toBe(1);
      let movie = page.searchResults.get(0);
      expect(movie.getText()).toEqual(targetMovie.name);
    });

    it(`navigates to ${targetMovie.name} details view`, async () => {
      let movie = getPageElts().searchResults.get(0);
      expect(movie.getText()).toEqual(targetMovie.name);
      movie.click();

      let page = getPageElts();
      expect(page.movieDetail.isPresent()).toBeTruthy('shows movie detail');
      let movie2 = await Movie.fromDetail(page.movieDetail);
      expect(movie2.id).toEqual(targetMovie.id);
      expect(movie2.name).toEqual(targetMovie.name.toUpperCase());
    });
  });

  async function dashboardSelectTargetMovie() {
    let targetMovieElt = getPageElts().topMovies.get(targetMovieDashboardIndex);
    expect(targetMovieElt.getText()).toEqual(targetMovie.name);
    targetMovieElt.click();
    browser.waitForAngular(); // seems necessary to gets tests to pass for toh-pt6

    let page = getPageElts();
    expect(page.movieDetail.isPresent()).toBeTruthy('shows movie detail');
    let movie = await Movie.fromDetail(page.movieDetail);
    expect(movie.id).toEqual(targetMovie.id);
    expect(movie.name).toEqual(targetMovie.name.toUpperCase());
  }

  async function updateMovieNameInDetailView() {
    // Assumes that the current view is the movie details view.
    addToMovieName(nameSuffix);

    let page = getPageElts();
    let movie = await Movie.fromDetail(page.movieDetail);
    expect(movie.id).toEqual(targetMovie.id);
    expect(movie.name).toEqual(newMovieName.toUpperCase());
  }

});

function addToMovieName(text: string): promise.Promise<void> {
  let input = element(by.css('input'));
  return input.sendKeys(text);
}

function expectHeading(hLevel: number, expectedText: string): void {
    let hTag = `h${hLevel}`;
    let hText = element(by.css(hTag)).getText();
    expect(hText).toEqual(expectedText, hTag);
};

function getMovieAEltById(id: number): ElementFinder {
  let spanForId = element(by.cssContainingText('li span.badge', id.toString()));
  return spanForId.element(by.xpath('..'));
}

function getMovieLiEltById(id: number): ElementFinder {
  let spanForId = element(by.cssContainingText('li span.badge', id.toString()));
  return spanForId.element(by.xpath('../..'));
}

async function toMovieArray(allMovies: ElementArrayFinder): Promise<Movie[]> {
  let promisedMovies = await allMovies.map(Movie.fromLi);
  // The cast is necessary to get around issuing with the signature of Promise.all()
  return <Promise<any>> Promise.all(promisedMovies);
}
