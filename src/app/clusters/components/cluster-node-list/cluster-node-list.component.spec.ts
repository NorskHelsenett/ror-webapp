import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClusterNodeListComponent } from './cluster-node-list.component';

describe('ClusterNodeListComponent', () => {
  let component: ClusterNodeListComponent;
  let fixture: ComponentFixture<ClusterNodeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClusterNodeListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClusterNodeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
