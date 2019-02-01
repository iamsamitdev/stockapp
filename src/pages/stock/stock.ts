import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { WebapiserviceProvider } from '../../providers/webapiservice/webapiservice';
import { GlobalProvider } from '../../providers/global/global';

@IonicPage()
@Component({
  selector: 'page-stock',
  templateUrl: 'stock.html',
})
export class StockPage {

  // กำหนดตัวไว้รับค่าจาก webAPI
  stockData: any
  imageURL:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public webAPI: WebapiserviceProvider,
    public alertCtrl: AlertController,
    public global: GlobalProvider) {
      this.imageURL = global.baseUrlImage;
  }

  ionViewDidLoad() {
    this.webAPI.getData('stock').then((result) => {
      //console.log(result);
      this.stockData = result;
    });
  }

}
