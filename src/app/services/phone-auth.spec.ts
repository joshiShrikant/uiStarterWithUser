import { TestBed } from '@angular/core/testing';

import { PhoneAuth } from './phone-auth';

describe('PhoneAuth', () => {
  let service: PhoneAuth;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhoneAuth);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
