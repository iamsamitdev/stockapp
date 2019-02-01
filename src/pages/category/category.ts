import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { WebapiserviceProvider } from '../../providers/webapiservice/webapiservice';
import { AddcategoryPage } from '../addcategory/addcategory';
import { EditcategoryPage } from '../editcategory/editcategory';
import { GlobalProvider } from '../../providers/global/global';

@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {

  // กำหนดตัวไว้รับค่าจาก webAPI
  categoryData: any
  status = ["Inactive", "Active"]
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
    this.webAPI.getData('stock/category').then((result) => {
      //console.log(result);
      this.categoryData = result;
    });
  }

  // Event เปลี่ยนไปหน้า AddCategory
  addCategory() {
    this.navCtrl.push(AddcategoryPage);
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    // แสดงผลทันที
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
      // แสดงผลหลังจากทำงานเสร็จ
      this.ionViewDidLoad();
    }, 2000);
  }

  // ฟังก์ชันการลบข้อมูล
  deleteCategory(id) {

    let confirm = this.alertCtrl.create({
      title: 'ยืนยันการลบข้อมูล',
      message: 'ต้องการลบรายการนี้หรือไม่',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        }, {
          text: 'Yes',
          handler: () => {
            console.log('Agree clicked');
            //alert(id);
            this.webAPI.deleteData('stock/category/' + id).then((result) => {
              //console.log(result);
              this.ionViewDidLoad();
            });
          }
        }
      ]
    });
    confirm.present();
    
  }

  // ฟังก์ชันแก้ไขข้อมูล
  editCategory(id){
    this.navCtrl.push(EditcategoryPage,{id:id}); // การ push แบบมีการส่งไปค่าด้วย
  }

}
