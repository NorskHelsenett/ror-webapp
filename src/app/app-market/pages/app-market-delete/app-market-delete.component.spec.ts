import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppMarketDeleteComponent } from './app-market-delete.component';

describe('AppMarketDeleteComponent', () => {
  let component: AppMarketDeleteComponent;
  let fixture: ComponentFixture<AppMarketDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppMarketDeleteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppMarketDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
