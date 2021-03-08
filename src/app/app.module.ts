import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SearchGiphyComponent } from './components/search-giphy/search-giphy.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchGiphyService } from './services/search-giphy.service';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { ImageComponent } from './components/image/image.component';
import { DebugInfoComponent } from './components/debug-info/debug-info.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule } from 'src/core/pipes/core.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    SearchGiphyComponent,
    ImageComponent,
    DebugInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ScrollingModule,
    LoadingBarHttpClientModule,
    NgbModule,
    CoreModule,
    RouterModule
  ],
  providers: [SearchGiphyService],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
