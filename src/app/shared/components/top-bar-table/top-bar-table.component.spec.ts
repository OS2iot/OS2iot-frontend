import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TopBarTableComponent } from './top-bar-table.component';

describe('TopBarTableComponent', () => {
  let component: TopBarTableComponent;
  let fixture: ComponentFixture<TopBarTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TopBarTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopBarTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
