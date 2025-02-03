import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualmachineToolsComponent } from './virtualmachine-tools.component';

describe('VirtualmachineToolsComponent', () => {
  let component: VirtualmachineToolsComponent;
  let fixture: ComponentFixture<VirtualmachineToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VirtualmachineToolsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VirtualmachineToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
