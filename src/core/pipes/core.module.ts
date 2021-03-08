  
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipesModule } from './pipes.module';

@NgModule({

  declarations: [],
  imports: [
    CommonModule,
    PipesModule.forRoot()
  ],
  exports: [
    CommonModule,
    PipesModule
  ],
  providers: []
})
export class CoreModule { }