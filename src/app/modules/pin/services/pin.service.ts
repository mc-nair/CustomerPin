import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PinService {

  private OnUpdate = new BehaviorSubject<boolean>(true);

  public OnUpdate$ = this.OnUpdate.asObservable();
  
  constructor() { }

  /**
   * function to get customer list
   *  
   */
  getCustomerList() {
  const storedData = JSON.parse(localStorage.getItem('customerDetails') || '[]');
  return storedData;
}

/**
 * function to save customer list
 *  
 */
 savePin(pinDetails: any){
  let existingPinDetails = JSON.parse(localStorage.getItem('pinDetails') ?? 'null');

  console.log('Customer1', existingPinDetails)
if (existingPinDetails) {
  existingPinDetails = [ ...existingPinDetails, ...pinDetails ];
} else {
  existingPinDetails = pinDetails;
}

localStorage.setItem('pinDetails', JSON.stringify(existingPinDetails));
this.OnUpdate.next(true);

}

/**
 * function to get pin list
 *  
 */
getPintList() {
  const storedData = JSON.parse(localStorage.getItem('pinDetails') || '[]');
  return storedData;
}

}
