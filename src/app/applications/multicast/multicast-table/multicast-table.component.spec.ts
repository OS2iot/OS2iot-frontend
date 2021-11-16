import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MulticastTableComponent } from './multicast-table.component';

describe('MulticastTableComponent', () => {
  let component: MulticastTableComponent;
  let fixture: ComponentFixture<MulticastTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MulticastTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MulticastTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
