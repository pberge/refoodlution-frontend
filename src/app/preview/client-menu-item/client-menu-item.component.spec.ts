import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientMenuItemComponent } from './client-menu-item.component';

describe('ClientMenuItemComponent', () => {
  let component: ClientMenuItemComponent;
  let fixture: ComponentFixture<ClientMenuItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientMenuItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
