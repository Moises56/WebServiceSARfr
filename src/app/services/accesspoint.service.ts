import {  EventEmitter, Injectable, Output } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AccesspointService {

  @Output() onToken: EventEmitter<any> = new EventEmitter();
  @Output() onRol: EventEmitter<any> = new EventEmitter();
  @Output() onVisible: EventEmitter<string> = new EventEmitter();
  @Output() onVisibleLog: EventEmitter<any> = new EventEmitter();
  


  constructor() { }
}
