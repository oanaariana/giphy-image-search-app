import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ObscenityPipe } from './obscenity.pipe';

@NgModule({
  declarations: [ObscenityPipe],
  imports: [
    CommonModule,

  ],
  exports: [
    ObscenityPipe
  ]
})
export class PipesModule { 
    static forRoot() {
        return {
            ngModule: PipesModule,
            providers: [],
        };
     }
}