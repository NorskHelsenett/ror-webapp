import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppMarketConfigureComponent } from './app-market-configure.component';

describe('AppMarketConfigureComponent', () => {
  let component: AppMarketConfigureComponent;
  let fixture: ComponentFixture<AppMarketConfigureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppMarketConfigureComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppMarketConfigureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
