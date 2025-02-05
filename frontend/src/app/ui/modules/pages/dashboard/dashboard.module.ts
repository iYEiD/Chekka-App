import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import {DashboardComponent} from "./page/dashboard.component";
import {NzCollapseModule} from "ng-zorro-antd/collapse";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzInputModule} from "ng-zorro-antd/input";
import {FormsModule} from "@angular/forms";
import {NzRateModule} from "ng-zorro-antd/rate";


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NzCollapseModule,
    NzDividerModule,
    NzButtonModule,
    NzModalModule,
    NzInputModule,
    FormsModule,
    NzRateModule
  ]
})
export class DashboardModule { }
