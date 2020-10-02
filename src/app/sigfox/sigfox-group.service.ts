import { Injectable } from '@angular/core';
import { RestService } from '../shared/services/rest.service';
import { Observable } from 'rxjs';
import { SigFoxGroup } from '@app/sigfox/sigfox-group.model';


export const SIGFOXGROUPS: SigFoxGroup[] = [
  {
    id: 1,
    name: "Århus kommune",
    username: "jeppe",
    password: "123456",
    createdAt: null,
    updatedAt: null,
    belongsTo: null
  },
  {
    id: 2,
    name: "Skanderborg kommune",
    username: "troels",
    password: "123456",
    createdAt: null,
    updatedAt: null,
    belongsTo: null
  }
]


@Injectable({
  providedIn: 'root'
})
export class SigfoxGroupService {
  public sigfoxGroups: SigFoxGroup[];
  private SIGFOXGROUPURL = 'sigfox-group';

  constructor(private restService: RestService) { }

  public getSigfoxGroupOne(id: string, params = {}): Observable<any> {
    return SIGFOXGROUPS[id];
  }

  public getSigfoxGroupMultiple(organizationId: number): Observable<any> {
    const body = { organizationId };
    return SIGFOXGROUPS[];
  }

  public post(sigfoxGroup: SigFoxGroup): Observable<SigFoxGroup> {
    this.sigfoxGroups.push(sigfoxGroup);
  }

  public put(id: string): Observable<SigFoxGroup> {
    SIGFOXGROUPS[id] = id;
  }

  // public put(sigfoxGroup: SigFoxGroup): Observable<SigFoxGroup> {
  //   return this.restService.put(this.SIGFOXGROUPURL, sigfoxGroup, sigfoxGroup.id);
  // }

  // public getSigfoxGroupOne(id: string, params = {}): Observable<any> {
  //   return this.restService.get(this.SIGFOXGROUPURL, params, id);
  // }

  // public getSigfoxGroupMultiple(organizationId: number): Observable<any> {
  //   const body = { organizationId };
  //   return this.restService.get(this.SIGFOXGROUPURL, body);
  // }

  // public post(sigfoxGroup: SigFoxGroup): Observable<SigFoxGroup> {
  //   return this.restService.post(this.SIGFOXGROUPURL, sigfoxGroup, { observe: 'response' });
  // }

  // public put(sigfoxGroup: SigFoxGroup): Observable<SigFoxGroup> {
  //   return this.restService.put(this.SIGFOXGROUPURL, sigfoxGroup, sigfoxGroup.id);
  // }
}
