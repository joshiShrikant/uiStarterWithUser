import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneLogin } from './phone-login';

describe('PhoneLogin', () => {
  let component: PhoneLogin;
  let fixture: ComponentFixture<PhoneLogin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhoneLogin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhoneLogin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
