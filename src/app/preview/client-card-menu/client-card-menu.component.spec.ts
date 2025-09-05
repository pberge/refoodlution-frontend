import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientCardMenuComponent } from './client-card-menu.component';

describe('ClientCardMenuComponent', () => {
  let component: ClientCardMenuComponent;
  let fixture: ComponentFixture<ClientCardMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientCardMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientCardMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
