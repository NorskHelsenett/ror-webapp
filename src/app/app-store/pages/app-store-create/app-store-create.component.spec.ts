import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppStoreCreateComponent } from './app-store-create.component';

describe('AppStoreCreateComponent', () => {
  let component: AppStoreCreateComponent;
  let fixture: ComponentFixture<AppStoreCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppStoreCreateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppStoreCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
