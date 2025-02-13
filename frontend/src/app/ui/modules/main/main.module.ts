import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import {MainComponent} from "./page/main.component";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzAvatarModule} from "ng-zorro-antd/avatar";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzSliderModule} from "ng-zorro-antd/slider";
import {FormsModule} from "@angular/forms";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzInputNumberModule} from "ng-zorro-antd/input-number";
import {NzBadgeModule} from "ng-zorro-antd/badge";
import {SharedPipesModule} from "../../../common/pipes/shared-pipes.module";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {NzSelectModule} from "ng-zorro-antd/select";


@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    NzInputModule,
    NzAvatarModule,
    NzButtonModule,
    NzIconModule,
    NzModalModule,
    NzDropDownModule,
    NzSliderModule,
    FormsModule,
    NzDividerModule,
    NzInputNumberModule,
    NzBadgeModule,
    NzDatePickerModule,
    SharedPipesModule,
    NzSelectModule
  ]
})
export class MainModule { }
