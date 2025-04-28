import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualmachineSpecsComponent } from './virtualmachine-specs.component';

describe('VirtualmachineSpecsComponent', () => {
  let component: VirtualmachineSpecsComponent;
  let fixture: ComponentFixture<VirtualmachineSpecsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VirtualmachineSpecsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VirtualmachineSpecsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
