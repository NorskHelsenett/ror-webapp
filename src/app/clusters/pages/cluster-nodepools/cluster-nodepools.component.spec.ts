import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClusterNodepoolsComponent } from './cluster-nodepools.component';

describe('ClusterNodepoolsComponent', () => {
  let component: ClusterNodepoolsComponent;
  let fixture: ComponentFixture<ClusterNodepoolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClusterNodepoolsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClusterNodepoolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
