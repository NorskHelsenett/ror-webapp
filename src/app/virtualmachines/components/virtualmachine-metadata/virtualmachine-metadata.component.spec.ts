import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualmachineMetadataComponent } from './virtualmachine-metadata.component';

describe('VirtualmachineMetadataComponent', () => {
  let component: VirtualmachineMetadataComponent;
  let fixture: ComponentFixture<VirtualmachineMetadataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VirtualmachineMetadataComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VirtualmachineMetadataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
