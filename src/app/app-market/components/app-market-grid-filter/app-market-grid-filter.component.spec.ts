import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppMarketGridFilterComponent } from './app-market-grid-filter.component';

describe('AppMarketGridFilterComponent', () => {
  let component: AppMarketGridFilterComponent;
  let fixture: ComponentFixture<AppMarketGridFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppMarketGridFilterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppMarketGridFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
