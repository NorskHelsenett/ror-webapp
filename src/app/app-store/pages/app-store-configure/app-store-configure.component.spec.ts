import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppStoreConfigureComponent } from './app-store-configure.component';

describe('AppStoreConfigureComponent', () => {
  let component: AppStoreConfigureComponent;
  let fixture: ComponentFixture<AppStoreConfigureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppStoreConfigureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppStoreConfigureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
