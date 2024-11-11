import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChooseSignupMethodRoutingModule } from './choose-signup-method-routing.module';
import {ChooseSignupMethodComponent} from "./page/choose-signup-method.component";
import {NzButtonModule} from "ng-zorro-antd/button";


@NgModule({
  declarations: [ChooseSignupMethodComponent],
  imports: [
    CommonModule,
    ChooseSignupMethodRoutingModule,
    NzButtonModule
  ]
})
export class ChooseSignupMethodModule { }
