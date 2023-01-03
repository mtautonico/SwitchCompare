import { TestBed } from '@angular/core/testing';

import { TabletoolsService } from './tabletools.service';

describe('TabletoolsService', () => {
  let service: TabletoolsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TabletoolsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
