import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualmachinesListComponent } from './virtualmachines-list.component';

describe('VirtualmachinesListComponent', () => {
  let component: VirtualmachinesListComponent;
  let fixture: ComponentFixture<VirtualmachinesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VirtualmachinesListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VirtualmachinesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
