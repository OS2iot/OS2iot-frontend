import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopBarSingleComponent } from './top-bar-single.component';

describe('TopBarSingleComponent', () => {
  let component: TopBarSingleComponent;
  let fixture: ComponentFixture<TopBarSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopBarSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopBarSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
