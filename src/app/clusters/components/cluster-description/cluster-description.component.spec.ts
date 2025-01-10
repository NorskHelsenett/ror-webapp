import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClusterDescriptionComponent } from './cluster-description.component';

describe('ClusterDescriptionComponent', () => {
  let component: ClusterDescriptionComponent;
  let fixture: ComponentFixture<ClusterDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClusterDescriptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClusterDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
