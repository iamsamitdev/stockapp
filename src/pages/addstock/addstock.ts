import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { WebapiserviceProvider } from '../../providers/webapiservice/webapiservice';


@IonicPage()
@Component({
  selector: 'page-addstock',
  templateUrl: 'addstock.html',
})
export class AddstockPage {

  // กำหนดตัวแปรไว้ผูกกับฟอร์ม (model)
  dataStock = {
    'product_barcode':'',
    'product_name':'',
    'product_qty':0,
    'product_price':0.00,
    'product_category':1,
    'product_image':'',
    'product_status':1
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private barcodeScanner: BarcodeScanner,
    public webAPI: WebapiserviceProvider,
    public toastCtrl: ToastController,) {
  }

  ionViewDidLoad() {
    //
  }

  Scan() {
    this.barcodeScanner.scan().then((barcodeData) => {
      console.log(barcodeData.text);
      //alert(barcodeData.text);
      this.dataStock.product_barcode = barcodeData.text;
    }, (err) => {
      // แสดง error
      console.log(err);
    });

  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  // ฟังก์ชันส่งข้อมูลไปยัง API
  AddStockProcess(){
    this.webAPI.postData(this.dataStock,"stock").then((result)=>{
      if(result !== null){
        this.presentToast("บันทึกรายการเรียบร้อยแล้ว");
        this.navCtrl.pop();
      }else{
        this.presentToast("ผิดพลาด ไม่สามารถบันทึกรายการได้");
      }
    });
  }

}
