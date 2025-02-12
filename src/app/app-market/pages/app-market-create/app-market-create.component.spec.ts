import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppMarketCreateComponent } from './app-market-create.component';

describe('AppMarketCreateComponent', () => {
  let component: AppMarketCreateComponent;
  let fixture: ComponentFixture<AppMarketCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppMarketCreateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppMarketCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
