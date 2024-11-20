import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import {AccountComponent} from "./page/account.component";
import {SharedPipesModule} from "../../../../common/pipes/shared-pipes.module";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzButtonModule} from "ng-zorro-antd/button";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [AccountComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedPipesModule,
    NzDividerModule,
    NzInputModule,
    NzButtonModule,
    FormsModule
  ]
})
export class AccountModule { }
