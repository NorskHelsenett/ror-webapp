import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppStoreGridComponent } from './app-store-grid.component';

describe('AppStoreGridComponent', () => {
  let component: AppStoreGridComponent;
  let fixture: ComponentFixture<AppStoreGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppStoreGridComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppStoreGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
