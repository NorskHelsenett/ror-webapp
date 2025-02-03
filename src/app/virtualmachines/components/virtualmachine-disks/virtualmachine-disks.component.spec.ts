import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualmachineDisksComponent } from './virtualmachine-disks.component';

describe('VirtualmachineDisksComponent', () => {
  let component: VirtualmachineDisksComponent;
  let fixture: ComponentFixture<VirtualmachineDisksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VirtualmachineDisksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VirtualmachineDisksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
