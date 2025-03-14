import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClusterNodepoolCreateorupdateComponent } from './cluster-nodepool-createorupdate.component';

describe('ClusterNodepoolCreateorupdateComponent', () => {
  let component: ClusterNodepoolCreateorupdateComponent;
  let fixture: ComponentFixture<ClusterNodepoolCreateorupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClusterNodepoolCreateorupdateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClusterNodepoolCreateorupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
