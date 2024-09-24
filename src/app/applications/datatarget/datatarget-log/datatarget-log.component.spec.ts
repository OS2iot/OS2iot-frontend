import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatargetLogComponent } from './datatarget-log.component';

describe('DatatargetLogComponent', () => {
  let component: DatatargetLogComponent;
  let fixture: ComponentFixture<DatatargetLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatatargetLogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatatargetLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
