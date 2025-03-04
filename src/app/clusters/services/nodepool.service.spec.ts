import { TestBed } from '@angular/core/testing';

import { NodepoolService } from './nodepool.service';

describe('NodepoolService', () => {
  let service: NodepoolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NodepoolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
