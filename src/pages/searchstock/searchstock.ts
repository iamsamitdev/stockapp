import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { WebapiserviceProvider } from '../../providers/webapiservice/webapiservice';
import { GlobalProvider } from '../../providers/global/global';

@IonicPage()
@Component({
  selector: 'page-searchstock',
  templateUrl: 'searchstock.html',
})
export class SearchstockPage {

  imageURL: any;

  // กำหนดตัวแปรไว้เปิดปิดการแสดงข้อมูลที่ค้นหา
  isOn: boolean;

  // กำหนดตัวแปรไว้ผูกกับฟอร์ม (model)
  dataStock = {
    'product_barcode': ''
  }

  // รับค่าจาก web api
  dataStockFromAPI = {
    "product_barcode": "",
    "product_category": "",
    "product_image": "",
    "product_name": "",
    "product_price": 0.00,
    "product_qty": 0
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private barcodeScanner: BarcodeScanner,
    public webAPI: WebapiserviceProvider,
    public toastCtrl: ToastController,
    public global: GlobalProvider) {
    this.imageURL = global.baseUrlImage;
    this.isOn = false;
  }

  ionViewDidLoad() {
    //
  }

  // สร้างฟังก์ชันค้นหา Stock จากฐานข้อมูลผ่าน API
  SearchStockAPI() {
    this.webAPI.postData(this.dataStock, "stock/search").then((result) => {
     // console.log(result);
      if (result[0].product_barcode != "") {
        this.dataStockFromAPI.product_barcode = result[0].product_barcode;
        this.dataStockFromAPI.product_name = result[0].product_name;
        this.dataStockFromAPI.product_category = result[0].product_category;
        this.dataStockFromAPI.product_price = result[0].product_price;
        this.dataStockFromAPI.product_qty = result[0].product_qty;
        this.dataStockFromAPI.product_image = result[0].product_image;
        this.isOn = true;
      }else{
        this.isOn = false;
        alert('ไม่พบข้อมูลสินค้า');
      }
    });
  }

  Scan() {
    this.barcodeScanner.scan().then((barcodeData) => {
      console.log(barcodeData.text);
      //alert(barcodeData.text);
      this.dataStock.product_barcode = barcodeData.text;
      this.SearchStockAPI();
    }, (err) => {
      // แสดง error
      console.log(err);
    });

  }

  SearchStockProcess() {
    this.SearchStockAPI();
  }

}
