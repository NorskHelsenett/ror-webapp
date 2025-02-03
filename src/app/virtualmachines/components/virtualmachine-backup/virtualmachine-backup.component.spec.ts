import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualmachineBackupComponent } from './virtualmachine-backup.component';

describe('VirtualmachineBackupComponent', () => {
  let component: VirtualmachineBackupComponent;
  let fixture: ComponentFixture<VirtualmachineBackupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VirtualmachineBackupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VirtualmachineBackupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
