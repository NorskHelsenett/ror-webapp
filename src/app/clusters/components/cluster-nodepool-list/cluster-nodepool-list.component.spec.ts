import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClusterNodepoolListComponent } from './cluster-nodepool-list.component';

describe('ClusterNodepoolListComponent', () => {
  let component: ClusterNodepoolListComponent;
  let fixture: ComponentFixture<ClusterNodepoolListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClusterNodepoolListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClusterNodepoolListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
