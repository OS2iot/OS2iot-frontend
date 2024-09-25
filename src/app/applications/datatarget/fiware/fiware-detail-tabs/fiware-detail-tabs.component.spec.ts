import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiwareDetailTabsComponent } from './fiware-detail-tabs.component';

describe('FiwireDetailTabsComponent', () => {
  let component: FiwareDetailTabsComponent;
  let fixture: ComponentFixture<FiwareDetailTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiwareDetailTabsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FiwareDetailTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
