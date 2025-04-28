import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualmachinesRawComponent } from './virtualmachines-raw.component';

describe('VirtualmachinesRawComponent', () => {
  let component: VirtualmachinesRawComponent;
  let fixture: ComponentFixture<VirtualmachinesRawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VirtualmachinesRawComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VirtualmachinesRawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
