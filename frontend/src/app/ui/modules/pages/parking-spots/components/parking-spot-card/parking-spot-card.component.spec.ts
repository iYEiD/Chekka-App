import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingSpotCardComponent } from './parking-spot-card.component';

describe('ParkingSpotCardComponent', () => {
  let component: ParkingSpotCardComponent;
  let fixture: ComponentFixture<ParkingSpotCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParkingSpotCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParkingSpotCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
