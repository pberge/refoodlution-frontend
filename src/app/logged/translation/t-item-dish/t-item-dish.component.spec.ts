import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TItemDishComponent } from './t-item-dish.component';

describe('TItemDishComponent', () => {
  let component: TItemDishComponent;
  let fixture: ComponentFixture<TItemDishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TItemDishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TItemDishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
