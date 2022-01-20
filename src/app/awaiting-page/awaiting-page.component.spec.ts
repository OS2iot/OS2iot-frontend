import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AwaitingPageComponent } from './awaiting-page.component';

describe('AwaitingPageComponent', () => {
  let component: AwaitingPageComponent;
  let fixture: ComponentFixture<AwaitingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AwaitingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AwaitingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
