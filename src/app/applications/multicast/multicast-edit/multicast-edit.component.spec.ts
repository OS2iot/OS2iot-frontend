import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MulticastEditComponent } from './multicast-edit.component';

describe('MulticastEditComponent', () => {
  let component: MulticastEditComponent;
  let fixture: ComponentFixture<MulticastEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MulticastEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MulticastEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
