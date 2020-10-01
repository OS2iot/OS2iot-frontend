import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubBarComponent } from './sub-bar.component';

describe('SubBarComponent', () => {
  let component: SubBarComponent;
  let fixture: ComponentFixture<SubBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
