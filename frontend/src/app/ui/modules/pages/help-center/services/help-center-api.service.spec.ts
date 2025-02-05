import { TestBed } from '@angular/core/testing';

import { HelpCenterApiService } from './help-center-api.service';

describe('HelpCenterApiService', () => {
  let service: HelpCenterApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HelpCenterApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
