import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatargetTestConnectionComponent } from './datatarget-test-connection.component';

describe('DatatargetTestConnectionComponent', () => {
  let component: DatatargetTestConnectionComponent;
  let fixture: ComponentFixture<DatatargetTestConnectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatatargetTestConnectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatatargetTestConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
