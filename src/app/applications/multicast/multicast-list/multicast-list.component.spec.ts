import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MulticastListComponent } from './multicast-list.component';

describe('MulticastListComponent', () => {
  let component: MulticastListComponent;
  let fixture: ComponentFixture<MulticastListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MulticastListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MulticastListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
