import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HelpCenterRoutingModule } from './help-center-routing.module';
import {FormsModule} from "@angular/forms";
import {HelpCenterComponent} from "./page/help-center.component";
import {NzAutosizeDirective, NzInputDirective, NzInputModule} from "ng-zorro-antd/input";
import {SharedPipesModule} from "../../../../common/pipes/shared-pipes.module";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzButtonModule} from "ng-zorro-antd/button";


@NgModule({
  declarations: [HelpCenterComponent],
  imports: [
    CommonModule,
    HelpCenterRoutingModule,
    FormsModule,
    CommonModule,
    NzInputModule,
    NzAutosizeDirective,
    SharedPipesModule,
    NzDividerModule,
    NzButtonModule
  ]
})
export class HelpCenterModule { }
