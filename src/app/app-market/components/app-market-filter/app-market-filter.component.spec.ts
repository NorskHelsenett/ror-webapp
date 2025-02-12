import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppMarketFilterComponent } from './app-market-filter.component';

describe('AppMarketFilterComponent', () => {
  let component: AppMarketFilterComponent;
  let fixture: ComponentFixture<AppMarketFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppMarketFilterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppMarketFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
