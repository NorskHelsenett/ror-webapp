import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualmachineDetailComponent } from './virtualmachine-detail.component';

describe('VirtualmachineDetailComponent', () => {
  let component: VirtualmachineDetailComponent;
  let fixture: ComponentFixture<VirtualmachineDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VirtualmachineDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VirtualmachineDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
