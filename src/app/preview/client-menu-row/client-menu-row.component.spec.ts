import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientMenuRowComponent } from './client-menu-row.component';

describe('ClientMenuRowComponent', () => {
  let component: ClientMenuRowComponent;
  let fixture: ComponentFixture<ClientMenuRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientMenuRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientMenuRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
