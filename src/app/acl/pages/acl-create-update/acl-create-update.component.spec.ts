import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AclCreateUpdatePageComponent } from './acl-create-update.component';

describe('AclCreateUpdateComponent', () => {
  let component: AclCreateUpdatePageComponent;
  let fixture: ComponentFixture<AclCreateUpdatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AclCreateUpdatePageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AclCreateUpdatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
