import { TestBed } from '@angular/core/testing';

import { GetswitchesService } from './getswitches.service';

describe('GetswitchesService', () => {
  let service: GetswitchesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetswitchesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
