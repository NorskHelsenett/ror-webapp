import { TestBed } from '@angular/core/testing';

import { ProviderFeaturesService } from './provider-features.service';

describe('ProviderFeaturesService', () => {
  let service: ProviderFeaturesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProviderFeaturesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
