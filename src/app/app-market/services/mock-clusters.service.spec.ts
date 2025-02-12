import { TestBed } from '@angular/core/testing';

import { MockClustersService } from './mock-clusters.service';

describe('MockClustersService', () => {
  let service: MockClustersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockClustersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
