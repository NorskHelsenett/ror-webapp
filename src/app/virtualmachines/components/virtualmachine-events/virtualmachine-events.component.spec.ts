import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualmachineEventsComponent } from './virtualmachine-events.component';

describe('VirtualmachineEventsComponent', () => {
  let component: VirtualmachineEventsComponent;
  let fixture: ComponentFixture<VirtualmachineEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VirtualmachineEventsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VirtualmachineEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
