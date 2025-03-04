import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClusterNodepoolCreateorupdateSummaryComponent } from './cluster-nodepool-createorupdate-summary.component';

describe('ClusterNodepoolCreateorupdateSummaryComponent', () => {
  let component: ClusterNodepoolCreateorupdateSummaryComponent;
  let fixture: ComponentFixture<ClusterNodepoolCreateorupdateSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClusterNodepoolCreateorupdateSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClusterNodepoolCreateorupdateSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
