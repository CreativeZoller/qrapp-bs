import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CallService {
  private subject = new Subject<any>();

  constructor() { }

  sendEmit(message: any | false) {
    this.subject.next(message);
  }

  getEmit(): Observable<any> {
    return this.subject.asObservable();
  }
}
