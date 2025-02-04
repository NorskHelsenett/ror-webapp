import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualmachineRemoteControlComponent } from './virtualmachine-remote-control.component';

describe('VirtualmachineRemoteControlComponent', () => {
  let component: VirtualmachineRemoteControlComponent;
  let fixture: ComponentFixture<VirtualmachineRemoteControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VirtualmachineRemoteControlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VirtualmachineRemoteControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
