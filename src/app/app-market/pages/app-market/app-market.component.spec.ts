import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppMarketComponent } from './app-market.component';

describe('AppMarketComponent', () => {
  let component: AppMarketComponent;
  let fixture: ComponentFixture<AppMarketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppMarketComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppMarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
