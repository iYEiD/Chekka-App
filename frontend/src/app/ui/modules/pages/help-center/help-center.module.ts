import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HelpCenterRoutingModule } from './help-center-routing.module';
import {FormsModule} from "@angular/forms";
import {HelpCenterComponent} from "./page/help-center.component";
import {NzAutosizeDirective, NzInputModule} from "ng-zorro-antd/input";
import {SharedPipesModule} from "../../../../common/pipes/shared-pipes.module";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzCollapseComponent, NzCollapsePanelComponent} from "ng-zorro-antd/collapse";


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
    NzButtonModule,
    NzModalModule,
    NzSelectModule,
    NzCollapseComponent,
    NzCollapsePanelComponent
  ]
})
export class HelpCenterModule { }
