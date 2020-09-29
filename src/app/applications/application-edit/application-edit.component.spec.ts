import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ApplicationEditComponent } from './application-edit.component';


describe('EditApplicationComponent', () => {
  let component: ApplicationEditComponent;
  let fixture: ComponentFixture<ApplicationEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicationEditComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
