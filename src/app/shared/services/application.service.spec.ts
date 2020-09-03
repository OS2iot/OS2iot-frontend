import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { RestService } from './rest.service';
import { Application } from 'src/app/models/application';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  public applicationsSubscription: Subscription;  
  private applicaitonUrl: string = 'application'

  constructor(
    private restService: RestService,
    
  ) { }

  public getApplication(id: number): Observable<Application> {
    return this.restService.get(this.applicaitonUrl, {}, id)
  }

  public updateApplication(id: number): Observable<Application> {
    return this.restService.update(this.applicaitonUrl, {}, id)
  }

  public postApplication(application: Application): Observable<Application> {
    return this.restService.post(this.applicaitonUrl, {}, application)
  }
  
}
