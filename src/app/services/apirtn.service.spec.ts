import { TestBed } from '@angular/core/testing';

import { ApirtnService } from './apirtn.service';

describe('ApirtnService', () => {
  let service: ApirtnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApirtnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
