import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, take } from 'rxjs';
import { CountryData, CustomerDetails } from '../../models/customer.formgroup.model';
import { CustomerService } from '../../services/customer.service';

// interface CountryData {
//   [code: string]: {
//       country: string;
//       region: string;
//   };
// }

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent implements OnInit {

  constructor(private readonly fb: FormBuilder, private customerService: CustomerService, private modalService: NgbModal) { }

  public filterCtrl = new FormControl();

  public countryControl = new FormControl();

  public ngxControl = new FormControl();

  customerFormGroup!: FormGroup;

  public activeModal!: NgbActiveModal;

  countries: any;

  transformedCountries: any;

  countriesList: any;

  filteredCountriesArray: any;
  
  filterData$ = new Subscription();

  /**
   * Life cycle hooks
   */ 
  ngOnInit(): void {
    this.initializeForm();
    this.getCountryList();
    this.filterData$ = this.filterCtrl.valueChanges.subscribe((value) => {
      if (!this.filterCtrl.value?.length) {
        this.filteredCountriesArray = [];
      } else {
        this.filterCountries();
      }
      
    });
  }

   /**
   * function to initialize form
   */
   initializeForm(): void{
    this.customerFormGroup = this.fb.group({
      title: new FormControl(null, { validators: [ Validators.required]}),
      email: new FormControl(null, {validators: [Validators.required, Validators.email]})
    });
  }

/**
 * function to get Country list
 * 
 */
getCountryList() {
  this.customerService.getCountry().pipe(
      take(1)
  ).subscribe((country: { data: CountryData }) => {
      this.countriesList = country.data;
      const regions = Object.values(country.data).map((item: any) => item.region);
      this.countries = this.removeDuplicates(regions);

  });
}

/**
 * function to Filter out duplicate regions
 * @param array 
 * @returns regions
 */
removeDuplicates(array: any[]) {
  return array.filter((value, index, self) => self.indexOf(value) === index);
}

/**
 * function to filer countries
 * @return void
 */
filterCountries() {
  const selectedRegion = this.filterCtrl.value;
  if (selectedRegion) {
    const typedCountryData = this.countriesList as Record<string, CountryData>;

    this.filteredCountriesArray = Object.entries(typedCountryData)
        .filter(([_, countryData]) => countryData['region'] === selectedRegion)
        .map(([countryCode, countryData]) => ({
            code: countryCode,
            country: countryData['country'],
            name: countryData['region']
        }));
  } 
}
  
  /**
   * function to submit form date
   * @returns void
   */
  onSubmit(): void{
    this.saveCustomer();
  }
    
  /**
   * function to save form date
   * @returns void
   */
  saveCustomer(): void{
    const formValue = this.customerFormGroup.value;
    let customers = new Array<CustomerDetails>(
      { title: formValue?.title, email: formValue?.email, region: this.filterCtrl.value, country: this.countryControl?.value}
    );
    this.customerService.saveCustomer(customers);
    this.customerFormGroup.reset();
    this.modalService.dismissAll();
    
  }
    
  closeModal(){
    this.modalService.dismissAll();
  }

  ngOnDestroy(){
    this.filterData$.unsubscribe();
  }
}
