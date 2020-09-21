import { Component, OnInit, Input } from '@angular/core';
import { Datatarget, DatatargetData } from 'src/app/models/datatarget';
import { Subscription } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DatatargetService } from '../../services/datatarget.service';
import { Location } from '@angular/common';
import { DatatargetResponse } from 'src/app/models/datatarget-response';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-form-body-datatarget',
  templateUrl: './form-body-datatarget.component.html',
  styleUrls: ['./form-body-datatarget.component.scss']
})
export class FormBodyDatatargetComponent implements OnInit {

  @Input() submitButton: string;
  public datatarget: Datatarget = new Datatarget();
  public form: FormGroup;
  public payLoad = '';
  public datatargetSubscription: Subscription;
  public errorMessages: any;
  public errorFields: string[];
  public formFailedSubmit = false;
  private id: number;
  private applicationId: number;

  constructor(
    private route: ActivatedRoute,
    public translate: TranslateService,
    private datatargetService: DatatargetService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.translate.use('da');
    this.id = +this.route.snapshot.paramMap.get('datatargetId');
    this.applicationId = +this.route.snapshot.paramMap.get('id');
    if (this.id !== 0) {
      this.getDatatarget(this.id);
    }
  }

  onSubmit(): void {
    if (this.id) {
      this.updateDatatarget();
    } else {
      this.createDatatarget();

    }
  }

  updateDatatarget() {
    this.datatargetService.update(this.datatarget)
      .subscribe(
        (datatargetResponse: DatatargetResponse) => {
          this.datatarget = this.mapToDatatarget(datatargetResponse);
          this.routeBack();
        },
        (error: HttpErrorResponse) => {
          this.handleError(error);
          this.formFailedSubmit = true;
        }
      );
  }

  createDatatarget() {
    this.datatarget.applicationId = this.applicationId;
    this.datatargetService.create(this.datatarget)
      .subscribe((datatargetData: DatatargetData) => {
        this.routeBack();
      },
        (error: HttpErrorResponse) => {
          this.handleError(error);
          this.formFailedSubmit = true;
        });

  }

  handleError(error: HttpErrorResponse) {
    this.errorFields = [];
    this.errorMessages = [];
    error.error.message.forEach((err) => {
      this.errorFields.push(err.property);
      this.errorMessages = this.errorMessages.concat(
        Object.values(err.constraints)
      );
    });
  }

  routeBack(): void {
    this.location.back();
  }

  onCoordinateKey(event: any) {
    console.log(event.target.value);
    console.log(event.target.maxLength);
    if (event.target.value.length > event.target.maxLength) {
      event.target.value = event.target.value.slice(
        0,
        event.target.maxLength
      );
    }
  }

  getDatatarget(id: number) {
    this.datatargetSubscription = this.datatargetService
      .get(id)
      .subscribe((datatargetResponse: DatatargetResponse) => {
        this.datatarget = this.mapToDatatarget(datatargetResponse);
      });
  }

  private mapToDatatarget(data: DatatargetResponse): Datatarget {
    const dt: Datatarget = {
      id: data.id,
      name: data.name,
      timeout: data.timeout,
      type: data.type,
      url: data.url,
      authorizationHeader: null,
      applicationId: data.application.id
    };
    return dt;
  }

}
