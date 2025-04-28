import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualmachineOsComponent } from './virtualmachine-os.component';

describe('VirtualmachineOsComponent', () => {
  let component: VirtualmachineOsComponent;
  let fixture: ComponentFixture<VirtualmachineOsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VirtualmachineOsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VirtualmachineOsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
