import { TestBed } from '@angular/core/testing';

import { FlightStateService } from './flight-state.service';

describe('FlightStateService', () => {
  let service: FlightStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlightStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
