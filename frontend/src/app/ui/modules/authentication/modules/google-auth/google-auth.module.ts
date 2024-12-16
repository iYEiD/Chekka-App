import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoogleAuthRoutingModule } from './google-auth-routing.module';
import {GoogleAuthComponent} from "./page/google-auth.component";


@NgModule({
  declarations: [GoogleAuthComponent],
  imports: [
    CommonModule,
    GoogleAuthRoutingModule
  ]
})
export class GoogleAuthModule { }
