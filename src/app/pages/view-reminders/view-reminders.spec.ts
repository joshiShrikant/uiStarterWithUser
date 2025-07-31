import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReminders } from './view-reminders';

describe('ViewReminders', () => {
  let component: ViewReminders;
  let fixture: ComponentFixture<ViewReminders>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewReminders]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewReminders);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
