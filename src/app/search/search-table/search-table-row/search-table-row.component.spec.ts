import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTableRowComponent } from './search-table-row.component';

describe('SearchTableRowComponent', () => {
  let component: SearchTableRowComponent;
  let fixture: ComponentFixture<SearchTableRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchTableRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTableRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
