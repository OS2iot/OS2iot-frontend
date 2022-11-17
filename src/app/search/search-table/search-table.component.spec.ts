import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SearchTableComponent } from './search-table.component';

describe('SearchTableComponent', () => {
  let component: SearchTableComponent;
  let fixture: ComponentFixture<SearchTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
