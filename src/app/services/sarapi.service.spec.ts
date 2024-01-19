import { TestBed } from '@angular/core/testing';

import { SarapiService } from './sarapi.service';

describe('SarapiService', () => {
  let service: SarapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SarapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
