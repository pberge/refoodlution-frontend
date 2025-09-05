import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TItemStringComponent } from './t-item-string.component';

describe('TItemStringComponent', () => {
  let component: TItemStringComponent;
  let fixture: ComponentFixture<TItemStringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TItemStringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TItemStringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
