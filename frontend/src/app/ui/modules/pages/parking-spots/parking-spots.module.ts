import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParkingSpotsRoutingModule } from './parking-spots-routing.module';
import {ParkingSpotsComponent} from "./page/parking-spots.component";
import {ParkingSpotCardComponent} from "./components/parking-spot-card/parking-spot-card.component";
import {NzCarouselModule} from "ng-zorro-antd/carousel";


@NgModule({
  declarations: [
    ParkingSpotsComponent,
    ParkingSpotCardComponent
  ],
  imports: [
    CommonModule,
    ParkingSpotsRoutingModule,
    NzCarouselModule
  ]
})
export class ParkingSpotsModule { }
