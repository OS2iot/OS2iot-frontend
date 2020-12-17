import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralDetailsComponent } from './general-details.component';

describe('GeneralDetailsComponent', () => {
  let component: GeneralDetailsComponent;
  let fixture: ComponentFixture<GeneralDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
