import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppMarketGridComponent } from './app-market-grid.component';

describe('AppMarketGridComponent', () => {
  let component: AppMarketGridComponent;
  let fixture: ComponentFixture<AppMarketGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppMarketGridComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppMarketGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
