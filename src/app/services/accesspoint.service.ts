import {  EventEmitter, Injectable, Output } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AccesspointService {

  @Output() onToken: EventEmitter<any> = new EventEmitter();

  constructor() { }
}
