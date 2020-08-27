import { Component, OnInit, Input } from '@angular/core';
import { Datatarget, DatatargetData } from 'src/app/models/datatarget';
import { Subscription } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DatatargetService } from '../../_services/datatarget.service';
import { Location } from '@angular/common';
import { DatatargetResponse } from 'src/app/models/datatarget-response';

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
  public formFailedSubmit: boolean = false;
  private id: number;
  private applicationId: number;

  constructor(
      private route: ActivatedRoute,
      public translate: TranslateService,
      private router: Router,
      private datatargetService: DatatargetService,
      private location: Location
  ) { }

  ngOnInit(): void {
    this.translate.use('da');
    this.id = +this.route.snapshot.paramMap.get('datatargetID');
    this.applicationId = +this.route.parent.parent.snapshot.paramMap.get('id');
    if (this.id) {
      this.getDatatarget(this.id)
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
      .subscribe((datatargetData: DatatargetData) => {
        this.datatarget = datatargetData.data[0]
      })
  }

  createDatatarget() {
    this.datatarget.applicationId = this.applicationId;
    //var data: DatatargetData = {data: [this.datatarget]}
    this.datatargetService.create(this.datatarget)
      .subscribe((datatargetData: DatatargetData) => {
        this.location.back();
      })
  }

  routeBack(): void {
    this.location.back()
  }

  onCoordinateKey(event: any) {
    console.log(event.target.value);
    console.log(event.target.maxLength);
    if (event.target.value.length > event.target.maxLength)
        event.target.value = event.target.value.slice(
            0,
            event.target.maxLength
        );
}

  getDatatarget(id: number){
    this.datatargetSubscription = this.datatargetService
      .getDatatarget(id)
      .subscribe((datatargetResponse: DatatargetResponse) => {
        //this.datatarget = datatargetResponse.data[0];
      });
  }

}
