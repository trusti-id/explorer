import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockInfosComponent } from './block-infos.component';

describe('BlockInfosComponent', () => {
  let component: BlockInfosComponent;
  let fixture: ComponentFixture<BlockInfosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockInfosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
