import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupRoutingModule } from './signup-routing.module';
import {SignupComponent} from "./page/signup.component";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzToolTipModule} from "ng-zorro-antd/tooltip";


@NgModule({
  declarations: [SignupComponent],
  imports: [
    CommonModule,
    SignupRoutingModule,
    NzInputModule,
    NzButtonModule,
    NzToolTipModule
  ]
})
export class SignupModule { }
