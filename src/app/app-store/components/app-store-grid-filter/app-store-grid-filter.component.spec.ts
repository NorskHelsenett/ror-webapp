import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppStoreGridFilterComponent } from './app-store-grid-filter.component';

describe('AppStoreGridFilterComponent', () => {
  let component: AppStoreGridFilterComponent;
  let fixture: ComponentFixture<AppStoreGridFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppStoreGridFilterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppStoreGridFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
