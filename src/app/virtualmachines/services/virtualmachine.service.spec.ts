import { TestBed } from '@angular/core/testing';

import { VirtualmachineService } from './virtualmachine.service';

describe('VirtualmachineService', () => {
  let service: VirtualmachineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VirtualmachineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
