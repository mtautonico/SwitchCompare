import { TestBed } from '@angular/core/testing';

import { ConsoleToggleServiceService } from './console-toogle-service.service';

describe('ConsoleToggleServiceService', () => {
  let service: ConsoleToggleServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsoleToggleServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
