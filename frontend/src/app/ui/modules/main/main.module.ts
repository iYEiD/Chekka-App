import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import {MainComponent} from "./page/main.component";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzAvatarModule} from "ng-zorro-antd/avatar";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzModalModule, NzModalService} from "ng-zorro-antd/modal";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzSliderModule} from "ng-zorro-antd/slider";
import {FormsModule} from "@angular/forms";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzInputNumberModule} from "ng-zorro-antd/input-number";
import {NzSegmentedModule} from "ng-zorro-antd/segmented";


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
    NzSegmentedModule
  ]
})
export class MainModule { }
