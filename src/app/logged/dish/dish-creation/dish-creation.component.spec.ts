import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DishCreationComponent } from './dish-creation.component';

describe('DishCreationComponent', () => {
  let component: DishCreationComponent;
  let fixture: ComponentFixture<DishCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DishCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DishCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
