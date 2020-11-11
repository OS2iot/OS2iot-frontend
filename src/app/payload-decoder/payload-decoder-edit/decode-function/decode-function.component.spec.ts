import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecodeFunctionComponent } from './decode-function.component';

describe('DecodeFunctionComponent', () => {
  let component: DecodeFunctionComponent;
  let fixture: ComponentFixture<DecodeFunctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecodeFunctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecodeFunctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
