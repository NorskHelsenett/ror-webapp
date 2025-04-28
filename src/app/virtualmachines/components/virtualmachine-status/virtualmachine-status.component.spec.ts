import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualmachineStatusComponent } from './virtualmachine-status.component';

describe('VirtualmachineStatusComponent', () => {
  let component: VirtualmachineStatusComponent;
  let fixture: ComponentFixture<VirtualmachineStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VirtualmachineStatusComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VirtualmachineStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
