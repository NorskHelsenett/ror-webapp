import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualmachineMetricsComponent } from './virtualmachine-metrics.component';

describe('VirtualmachineMetricsComponent', () => {
  let component: VirtualmachineMetricsComponent;
  let fixture: ComponentFixture<VirtualmachineMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VirtualmachineMetricsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VirtualmachineMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
