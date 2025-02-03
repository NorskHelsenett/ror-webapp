import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualmachineNetworkComponent } from './virtualmachine-network.component';

describe('VirtualmachineNetworkComponent', () => {
  let component: VirtualmachineNetworkComponent;
  let fixture: ComponentFixture<VirtualmachineNetworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VirtualmachineNetworkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VirtualmachineNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
