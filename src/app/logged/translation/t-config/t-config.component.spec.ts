import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TConfigComponent } from './t-config.component';

describe('TConfigComponent', () => {
  let component: TConfigComponent;
  let fixture: ComponentFixture<TConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
