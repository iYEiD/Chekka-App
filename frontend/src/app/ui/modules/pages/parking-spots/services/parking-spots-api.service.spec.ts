import { TestBed } from '@angular/core/testing';

import { ParkingSpotsApiService } from './parking-spots-api.service';

describe('ParkingSpotsApiService', () => {
  let service: ParkingSpotsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParkingSpotsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
