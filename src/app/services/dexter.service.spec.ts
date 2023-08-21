import { TestBed } from '@angular/core/testing';

import { DexterService } from './dexter.service';

describe('DexterService', () => {
  let service: DexterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DexterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
