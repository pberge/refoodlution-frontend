import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedsysResponseComponent } from './redsys-response.component';

describe('RedsysResponseComponent', () => {
  let component: RedsysResponseComponent;
  let fixture: ComponentFixture<RedsysResponseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedsysResponseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedsysResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
