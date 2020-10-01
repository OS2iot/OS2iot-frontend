import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { Observable } from 'rxjs';
import { SigfoxGroup } from '@shared/models/sigfox-group.model';

@Injectable({
  providedIn: 'root'
})
export class SigfoxGroupService {

  private SIGFOXGROUPURL = 'sigfox-group';

  constructor(private restService: RestService) { }

  public getSigfoxGroupOne(id: string, params = {}): Observable<any> {
    return this.restService.get(this.SIGFOXGROUPURL, params, id);
  }

  public getSigfoxGroupMultiple(organizationId: number): Observable<any> {
    const body = {organizationId};
    return this.restService.get(this.SIGFOXGROUPURL, body);
  }

  public post(sigfoxGroup: SigfoxGroup): Observable<SigfoxGroup> {
    return this.restService.post(this.SIGFOXGROUPURL, sigfoxGroup, { observe: 'response' });
  }

  public put(sigfoxGroup: SigfoxGroup): Observable<SigfoxGroup> {
    return this.restService.put(this.SIGFOXGROUPURL, sigfoxGroup, sigfoxGroup.id);
  }
}
