import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceProfileItemComponent } from './service-profile-item.component';

describe('ServiceProfileItemComponent', () => {
  let component: ServiceProfileItemComponent;
  let fixture: ComponentFixture<ServiceProfileItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceProfileItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceProfileItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
