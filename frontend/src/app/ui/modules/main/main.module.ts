import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import {MainComponent} from "./page/main.component";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzAvatarModule} from "ng-zorro-antd/avatar";
import {NzButtonModule} from "ng-zorro-antd/button";


@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    NzInputModule,
    NzAvatarModule,
    NzButtonModule,
  ]
})
export class MainModule { }
