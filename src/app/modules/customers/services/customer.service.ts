import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { CustomerDetails } from '../models/customer.formgroup.model';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private readonly http: HttpClient) { }

  /**
   * function to get Country/region
   * @returns Observable
   */
  getCountry() : Observable<any>{
    return this.http.get<any>('https://api.first.org/data/v1/countries').pipe(
      catchError((error: any) => {
        return of([]);
      })
    );
  }

  /**
   * function to get Country/region
   * @params customerDetails: CustomerDetails[]
   * @returns void
   */
  saveCustomer(customerDetails: CustomerDetails[]){
    let existingCustomerDetails = JSON.parse(localStorage.getItem('customerDetails') ?? 'null');
  if (existingCustomerDetails) {
    existingCustomerDetails = [ ...existingCustomerDetails, ...customerDetails ];
  } else {
    existingCustomerDetails = customerDetails;
  }

  localStorage.setItem('customerDetails', JSON.stringify(existingCustomerDetails));
  }
}
