import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppMarketInstallComponent } from './app-market-install.component';

describe('AppMarketInstallComponent', () => {
  let component: AppMarketInstallComponent;
  let fixture: ComponentFixture<AppMarketInstallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppMarketInstallComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppMarketInstallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
