import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthStatisticComponent } from './auth-statistic.component';

describe('AuthStatisticComponent', () => {
  let component: AuthStatisticComponent;
  let fixture: ComponentFixture<AuthStatisticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthStatisticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
