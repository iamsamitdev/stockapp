import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WebapiserviceProvider } from '../../providers/webapiservice/webapiservice';

@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {

  // กำหนดตัวไว้รับค่าจาก webAPI
  categoryData: any
  status = ["Inactive", "Active"]

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public webAPI: WebapiserviceProvider) {
  }

  ionViewDidLoad() {
    this.webAPI.getData('stock/category').then((result)=>{
      //console.log(result);
      this.categoryData = result;
    });
  }

}
