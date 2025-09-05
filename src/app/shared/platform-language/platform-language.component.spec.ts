import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformLanguageComponent } from './platform-language.component';

describe('PlatformLanguageComponent', () => {
  let component: PlatformLanguageComponent;
  let fixture: ComponentFixture<PlatformLanguageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlatformLanguageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatformLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
