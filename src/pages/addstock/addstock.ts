import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@IonicPage()
@Component({
  selector: 'page-addstock',
  templateUrl: 'addstock.html',
})
export class AddstockPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private barcodeScanner: BarcodeScanner) {
  }

  ionViewDidLoad() {
    //
  }

  Scan() {
    this.barcodeScanner.scan().then((barcodeData) => {
      console.log(barcodeData.text);
      alert(barcodeData.text);
    }, (err) => {
      // แสดง error
      console.log(err);
    });

  }

}
