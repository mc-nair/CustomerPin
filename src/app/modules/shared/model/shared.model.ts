import { FormControl } from "@angular/forms";

//export type NullableFormControl<T> = FormControl<GenericNull<T>>

export type GenericNull<T> = T | null

// export interface CountryRegionsResponse {
//     status: string;
//     status-code: number;
//     version: string;
//     access: string;
//     data: Country[];
//   }
  
//   export interface Country {
//     data: { [key: string]: { country: string, region: string } };
//   }
  
export interface CustomerList {
    title: string ;
    email: string ;
    region: string ;
    country: string ;
}

export interface Pin{
    title: string;
    fileUrl: any;
    customers: string[];
    option: string;
}