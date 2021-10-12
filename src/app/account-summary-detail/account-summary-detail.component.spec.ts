import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSummaryDetailComponent } from './account-summary-detail.component';

describe('AccountSummaryDetailComponent', () => {
  let component: AccountSummaryDetailComponent;
  let fixture: ComponentFixture<AccountSummaryDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountSummaryDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSummaryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
