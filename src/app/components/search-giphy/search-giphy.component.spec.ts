import { ComponentFixture, fakeAsync, inject, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { Observable, of, Subscription, throwError } from 'rxjs';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { RouterTestingModule } from '@angular/router/testing';

import { ImageComponent } from '../image/image.component';
import { PageObject } from '../../test-utils/page-object';
import { SearchGiphyService } from '../../services/search-giphy.service';
import { GiphyGifObject, GiphySearchResult } from '../../types';
import { DebugInfoComponent } from '../debug-info/debug-info.component';

import { SearchGiphyComponent } from './search-giphy.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { ObscenityPipe } from 'src/core/pipes/obscenity.pipe';
import { Router } from '@angular/router';

@Pipe({ name: 'ObscenityPipe' })
class MockObscenityPipe implements PipeTransform {
  transform(value: any): any {
    console.log('mock')
    return value;
  }
}

describe('SearchGiphyComponent', () => {
  let component: SearchGiphyComponent;
  let fixture: ComponentFixture<SearchGiphyComponent>;
  let mockSearchGiphyService: SearchGiphyService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let router: Router;


  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        SearchGiphyComponent,
        DebugInfoComponent,
        ImageComponent,
        ObscenityPipe,
        MockObscenityPipe
      ],
      imports: [
        BrowserModule,
        FormsModule,
        ScrollingModule,
        LoadingBarHttpClientModule,
        HttpClientTestingModule,
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [
        { provide: Router, useValue: { navigate: () => { } } },
        { provide: SearchGiphyService, useValue: mockSearchGiphyService },
        HttpClient
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
      ],
    }).compileComponents()
      .then(() => {
        mockSearchGiphyService = TestBed.inject(SearchGiphyService);
        httpTestingController = TestBed.inject(HttpTestingController);
        httpClient = TestBed.inject(HttpClient);
      })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchGiphyComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
    fixture.autoDetectChanges(true);
  });
  
  it('should create the app', () => {
    const fixture = TestBed.createComponent(SearchGiphyComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
  
});
