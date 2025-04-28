import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualmachineDetailsComponent } from './virtualmachine-details.component';

describe('VirtualmachineDetailsComponent', () => {
  let component: VirtualmachineDetailsComponent;
  let fixture: ComponentFixture<VirtualmachineDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VirtualmachineDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VirtualmachineDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
