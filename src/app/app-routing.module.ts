import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchGiphyComponent } from './components/search-giphy/search-giphy.component';

const routes: Routes = [
  {path: '', component: SearchGiphyComponent},
  {path: 'search', component: SearchGiphyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }