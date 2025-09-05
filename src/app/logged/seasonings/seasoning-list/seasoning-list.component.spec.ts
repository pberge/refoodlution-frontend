/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SeasoningListComponent } from './seasoning-list.component';

describe('SeasoningListComponent', () => {
  let component: SeasoningListComponent;
  let fixture: ComponentFixture<SeasoningListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeasoningListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeasoningListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
