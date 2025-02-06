import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualmachinePriceComponent } from './virtualmachine-price.component';

describe('VirtualmachinePriceComponent', () => {
  let component: VirtualmachinePriceComponent;
  let fixture: ComponentFixture<VirtualmachinePriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VirtualmachinePriceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VirtualmachinePriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
