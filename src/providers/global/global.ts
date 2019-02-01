import { Injectable } from '@angular/core';

@Injectable()
export class GlobalProvider {

   // Develoment test
  public baseURL:string = "http://192.168.1.51/";
  // Production
  //public baseURL:string = "https://www.itgenius.co.th/";

  public baseUrlAPI:string = this.baseURL+"stockapi/public/api/v1/";

 // Develoment test
 public baseUrlImage = this.baseURL+"stockapi/public/images/"

  constructor() {
    
  }

}
