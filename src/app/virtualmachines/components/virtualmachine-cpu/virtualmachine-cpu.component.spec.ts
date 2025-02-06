import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualmachineCpuComponent } from './virtualmachine-cpu.component';

describe('VirtualmachineCpuComponent', () => {
  let component: VirtualmachineCpuComponent;
  let fixture: ComponentFixture<VirtualmachineCpuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VirtualmachineCpuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VirtualmachineCpuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
