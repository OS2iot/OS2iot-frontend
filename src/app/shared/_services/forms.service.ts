import { Injectable } from '@angular/core';
import { Application } from 'src/app/models/application';

@Injectable({
  providedIn: 'root'
})
export class FormsService {
  application: Application;

  constructor() {
    
  }
}
