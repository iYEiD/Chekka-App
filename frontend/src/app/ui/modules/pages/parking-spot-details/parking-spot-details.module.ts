import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParkingSpotDetailsRoutingModule } from './parking-spot-details-routing.module';
import {ParkingSpotDetailsComponent} from "./page/parking-spot-details.component";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzAvatarModule} from "ng-zorro-antd/avatar";
import {SharedPipesModule} from "../../../../common/pipes/shared-pipes.module";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {FormsModule} from "@angular/forms";
import {NzCarouselModule} from "ng-zorro-antd/carousel";
import {NzRateModule} from "ng-zorro-antd/rate";


@NgModule({
  declarations: [ParkingSpotDetailsComponent],
    imports: [
      CommonModule,
      ParkingSpotDetailsRoutingModule,
      NzDividerModule,
      NzAvatarModule,
      NzButtonModule,
      NzDatePickerModule,
      SharedPipesModule,
      FormsModule,
      NzCarouselModule,
      NzRateModule
    ]
})
export class ParkingSpotDetailsModule { }
