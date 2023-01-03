import { TestBed } from '@angular/core/testing';

import { APIFetchService } from './apifetch.service';

describe('APIFetchService', () => {
  let service: APIFetchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(APIFetchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
