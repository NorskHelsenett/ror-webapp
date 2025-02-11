import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppStoreFilterComponent } from './app-store-filter.component';

describe('AppStoreFilterComponent', () => {
  let component: AppStoreFilterComponent;
  let fixture: ComponentFixture<AppStoreFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppStoreFilterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppStoreFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
