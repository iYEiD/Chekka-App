import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CamelToTitleCasePipe} from "./pipes/camel-to-title-case.pipe";
import {SnakeToTitleCasePipe} from "./pipes/snake-to-title-case.pipe";



@NgModule({
  declarations: [
    CamelToTitleCasePipe,
    SnakeToTitleCasePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CamelToTitleCasePipe,
    SnakeToTitleCasePipe
  ]
})
export class SharedPipesModule { }
