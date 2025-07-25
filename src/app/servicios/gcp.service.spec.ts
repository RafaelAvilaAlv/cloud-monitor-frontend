import { TestBed } from '@angular/core/testing';

import { GcpService } from './gcp.service';

describe('GcpService', () => {
  let service: GcpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GcpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
