import { TestBed } from '@angular/core/testing';

import { GetbrandsService } from './getbrands.service';

describe('GetbrandsService', () => {
  let service: GetbrandsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetbrandsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
