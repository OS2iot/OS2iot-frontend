import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataPackagesTimestampComponent } from './data-packages-timestamp.component';

describe('DataPackagesTimestampComponent', () => {
  let component: DataPackagesTimestampComponent;
  let fixture: ComponentFixture<DataPackagesTimestampComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataPackagesTimestampComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataPackagesTimestampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
