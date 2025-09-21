import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatAccount } from './activat-account';

describe('ActivatAccount', () => {
  let component: ActivatAccount;
  let fixture: ComponentFixture<ActivatAccount>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivatAccount]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivatAccount);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
