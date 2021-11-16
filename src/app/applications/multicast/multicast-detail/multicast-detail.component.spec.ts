import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MulticastDetailComponent } from './multicast-detail.component';

describe('MulticastDetailComponent', () => {
  let component: MulticastDetailComponent;
  let fixture: ComponentFixture<MulticastDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MulticastDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MulticastDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
