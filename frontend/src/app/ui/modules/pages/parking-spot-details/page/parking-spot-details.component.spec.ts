import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingSpotDetailsComponent } from './parking-spot-details.component';

describe('ParkingSpotDetailsComponent', () => {
  let component: ParkingSpotDetailsComponent;
  let fixture: ComponentFixture<ParkingSpotDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParkingSpotDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParkingSpotDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
