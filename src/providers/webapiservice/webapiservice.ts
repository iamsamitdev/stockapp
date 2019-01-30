import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class WebapiserviceProvider {

  baseURL:any;

  constructor(public http: Http) {
    this.baseURL= "http://192.168.1.52/stockapi/public/api/v1/";
  }

  // สร้างฟังก์ชันสำหรับการดึงข้อมูล
  getData(segment){
    return new Promise((resolve,reject) => {
      let headers = new Headers()
      headers.append('Content-Type','application/json;charset=UTF-8')
      this.http.get(this.baseURL+segment,{headers:headers}).subscribe(res => {
        resolve(res.json())
      },(err) => {
        reject(err)
      });
    })
  }

  // สร้างฟังก์ชันสำหรับการ post ข้อมูลไปยัง API Server
  postData(objdata,segment){
    return new Promise((resolve,reject) => {
      let headers = new Headers()
      headers.append('Content-Type','application/json;charset=UTF-8')
      this.http.post(this.baseURL+segment,JSON.stringify(objdata),{headers:headers}).subscribe(res => {
        resolve(res.json())
      },(err) => {
        reject(err)
      });
    })
  }

  // สร้างฟังก์ชันสำหรับการ put แก้ไขข้อมูลไปยัง API Server
  editData(objdata,segment){
    return new Promise((resolve,reject) => {
      let headers = new Headers()
      headers.append('Content-Type','application/json;charset=UTF-8')
      this.http.put(this.baseURL+segment,JSON.stringify(objdata),{headers:headers}).subscribe(res => {
        resolve(res.json())
      },(err) => {
        reject(err)
      });
    })
  }

   // สร้างฟังก์ชันสำหรับการลบข้อมูล
   deleteData(segment){
    return new Promise((resolve,reject) => {
      let headers = new Headers()
      headers.append('Content-Type','application/json;charset=UTF-8')
      this.http.delete(this.baseURL+segment,{headers:headers}).subscribe(res => {
        resolve(res.json())
      },(err) => {
        reject(err)
      });
    })
  }

}
