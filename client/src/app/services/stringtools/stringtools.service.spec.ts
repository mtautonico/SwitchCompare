import { TestBed } from '@angular/core/testing';

import { StringtoolsService } from './stringtools.service';

describe('StringtoolsService', () => {
  let service: StringtoolsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StringtoolsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
