import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SearchGiphyService } from './search-giphy.service';
import { GiphyGifObject, GiphySearchResult } from '../types';

const mockGifObjects: GiphyGifObject[] = [
  {
    title: 'MockImage1',
    images: {
      fixed_height: {
        url: 'https://angular.io/assets/images/logos/angular/angular.png'
      }
    },
  },
  {
    title: 'MockImage2',
    images: {
      fixed_height: {
        url: 'https://themes.getbootstrap.com/wp-content/themes/bootstrap-marketplace/assets/images/elements/bootstrap-stack.png'
      }
    },
  },
  {
    title: 'MockImage3',
    images: {
      fixed_height: {
        url: 'https://raw.githubusercontent.com/remojansen/logo.ts/master/ts.png'
      }
    },
  }
];

const mockGiphySearchResult: GiphySearchResult = {
  data: mockGifObjects,
  pagination: null,
  meta: null,
};

describe('SearchGiphyService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let service: SearchGiphyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SearchGiphyService]
    });
    injector = getTestBed();
    service = injector.inject(SearchGiphyService);
    httpMock = injector.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });  

  it('should be created', () => {
    const service: SearchGiphyService = TestBed.inject(SearchGiphyService);
    expect(service).toBeTruthy();
  });

  it('getGiphys() should return data', () => {
    service.getGiphys('puppies', 0, 100).subscribe((res) => {
      return expect(res).toEqual(mockGiphySearchResult);
    });

    const req = httpMock.expectOne('https://api.giphy.com/v1/gifs/search?api_key=CdRKiCMbTnt9CkZTZ0lGukSczk6iT4Z6&q=puppies&limit=100&offset=0');
    expect(req.request.method).toBe('GET');
    req.flush(mockGiphySearchResult);
  });
});
