

export interface CustomerDetails {
    title: string ;
    email: string ;
    region: string ;
    country: string ;
}
  
export interface CountryData {
    [code: string]: {
        country: string;
        region: string;
    };
  }
  