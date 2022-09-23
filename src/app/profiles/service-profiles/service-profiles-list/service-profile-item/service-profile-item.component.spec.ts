import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ServiceProfileItemComponent } from './service-profile-item.component';

describe('ServiceProfileItemComponent', () => {
  let component: ServiceProfileItemComponent;
  let fixture: ComponentFixture<ServiceProfileItemComponent>;

  beforeEach(waitForAsync(() => {
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
