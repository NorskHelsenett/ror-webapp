import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppStoreDeleteComponent } from './app-store-delete.component';

describe('AppStoreDeleteComponent', () => {
  let component: AppStoreDeleteComponent;
  let fixture: ComponentFixture<AppStoreDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppStoreDeleteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppStoreDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
