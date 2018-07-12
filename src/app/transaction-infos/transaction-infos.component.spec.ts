import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionInfosComponent } from './transaction-infos.component';

describe('TransactionInfosComponent', () => {
  let component: TransactionInfosComponent;
  let fixture: ComponentFixture<TransactionInfosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionInfosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
