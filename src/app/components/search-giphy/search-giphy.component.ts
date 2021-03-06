import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { GiphyGifObject, GiphyPaginationObject, GiphySearchResult } from '../../types';
import { SearchGiphyService } from 'src/app/services/search-giphy.service';
import { nonEmptyPredicate } from 'src/app/utils/helpers';

@Component({
  selector: 'app-search-giphy',
  templateUrl: './search-giphy.component.html',
  styleUrls: ['./search-giphy.component.scss']
})
export class SearchGiphyComponent implements OnInit, OnDestroy {
  @ViewChild(CdkVirtualScrollViewport) virtualScroll: CdkVirtualScrollViewport;
  pagination: GiphyPaginationObject;
  images: GiphyGifObject[];
  showDebugInfo = environment.app.showDebugInfo;
  scrollRequestThreshold = environment.app.scrollRequestThreshold;
  error = false;
  query: string;
  queryModelChanged: Subject<string> = new Subject<string>();
  queryModelChangedSubscription: Subscription;
  onScrollIndexChangedSubscription: Subscription;
  loadMoreItemsSubscription: Subscription;


  constructor(private service: SearchGiphyService) {}

  ngOnInit(): void {
    this.queryModelChangedSubscription = this.queryModelChanged
      .pipe(
        debounceTime(500),
        filter(nonEmptyPredicate),
        distinctUntilChanged()
      )
      .subscribe(newValue => {
        this.query = newValue;
        this.searchGiphy();
      });
  }

  searchGiphy() {
    this.service.getGiphys(this.query).subscribe((result: GiphySearchResult) => {
      this.pagination = result.pagination;
      this.images = result.data;
      this.error = false;
      this.virtualScroll.scrollToIndex(0);
      this.resetScrollSubscription();
      this.onScrollIndexChangedSubscription = this.virtualScroll.scrolledIndexChange
        .pipe(
          debounceTime(500),
          distinctUntilChanged()
        )
        .subscribe(
          this.onScrollIndexChanged.bind(this)
        );
    }, () => {
      this.error = true;
    });
  }

  onScrollIndexChanged(scrollIndex: number) {
    // check whether the user has scrolled reaching the scrollRequestThreshold
    if (this.pagination && (scrollIndex >= Math.floor(this.images.length * this.scrollRequestThreshold / 100))) {
      // check if there are more items that can be requested
      if (this.pagination.total_count > this.pagination.count && this.pagination.total_count > this.pagination.offset) {
        this.loadMoreItems();
      }
    }
  }

  loadMoreItems() {
    if (this.loadMoreItemsSubscription) {
      this.loadMoreItemsSubscription.unsubscribe();
    }

    this.loadMoreItemsSubscription = this.service.getGiphys(this.query, this.images.length).subscribe((result: GiphySearchResult) => {
      this.pagination = result.pagination;
      this.images = [...this.images, ...result.data];
      this.error = false;
    }, () => {
      this.error = true;
    });
  }

  resetScrollSubscription() {
    if (this.onScrollIndexChangedSubscription) {
      this.onScrollIndexChangedSubscription.unsubscribe();
    }
  }

  ngOnDestroy() {
    if (this.queryModelChangedSubscription) {
      this.queryModelChangedSubscription.unsubscribe();
    }
    this.resetScrollSubscription();
  }

}
