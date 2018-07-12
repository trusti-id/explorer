import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressInfosComponent } from './address-infos.component';

describe('AddressInfosComponent', () => {
  let component: AddressInfosComponent;
  let fixture: ComponentFixture<AddressInfosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressInfosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
