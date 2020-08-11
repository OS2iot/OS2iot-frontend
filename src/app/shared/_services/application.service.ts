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

  public get(id: number = null, params = {}): Observable<any> {
    return this.restService.get(this.applicaitonUrl, params, id)
  }

  public update(json, id: number): Observable<any> {
    return this.restService.replace(this.applicaitonUrl, json, id)
  }

  public post(json): Observable<any> {
    return this.restService.post(this.applicaitonUrl, json)
  }

  public delete(id: number): Observable<any> {
    return this.restService.delete(this.applicaitonUrl, id)
  }
  
}
