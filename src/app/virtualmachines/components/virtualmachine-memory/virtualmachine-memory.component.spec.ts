import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualmachineMemoryComponent } from './virtualmachine-memory.component';

describe('VirtualmachineMemoryComponent', () => {
  let component: VirtualmachineMemoryComponent;
  let fixture: ComponentFixture<VirtualmachineMemoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VirtualmachineMemoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VirtualmachineMemoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
