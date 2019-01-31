import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  ActionSheetController,
  ToastController,
  Platform,
  LoadingController,
  Loading,
  NavParams
} from 'ionic-angular';

import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';

import { WebapiserviceProvider } from '../../providers/webapiservice/webapiservice';

@IonicPage()
@Component({
  selector: 'page-editcategory',
  templateUrl: 'editcategory.html',
})
export class EditcategoryPage {

  // สร้างตัวแปรไว้เก็บรูปภาพล่าสุดและ loading
  lastImage: string = null;
  loading: Loading;

  id: number;
  // กำหนดตัวไว้ผู้กับฟอร์ม
  dataCategory = {
    'category_name': '',
    'category_status': '',
    'category_image': ''
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public camera: Camera,
    public transfer: Transfer,
    public file: File,
    public filePath: FilePath,
    public actionSheetCtrl: ActionSheetController,
    public toastCtrl: ToastController,
    public platform: Platform,
    public loadingCtrl: LoadingController,
    public webAPI: WebapiserviceProvider) {
    this.id = this.navParams.get('id');
  }

  ionViewDidLoad() {
    // alert(this.id);
    this.webAPI.getData('stock/category/edit/' + this.id).then((result) => {
      //console.log(result);
      this.dataCategory.category_name = result[0].category_name;
      this.dataCategory.category_status = result[0].category_status;
      this.dataCategory.category_image = result[0].category_image;
    });
  }

  // Event เลือกภาพ
  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'เลือกแหล่งรูปภาพ',
      buttons: [
        {
          text: 'จากแกเลอรี่',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'ถ่ายภาพ',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'ปิดหน้าต่าง',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  // ฟังก์ชันการเลือกและถ่ายภาพ
  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      this.presentToast('Error while selecting image.');
    });
  }

  // Create a new name for the image
  private createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }

  // Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
    }, error => {
      this.presentToast('Error while storing file.');
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

  // Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      this.dataCategory.category_image = img;
      return this.file.dataDirectory + img;
    }
  }

  // ฟังก์ชันบันทึกข้อมูลส่งไป WebAPI
  EditCategoryProcess() {
    // ตรวจว่าผู้ใช้มีการเลือกไฟล์
    if (this.lastImage !== null) {
      // คำสั่งการอัพโหลดไฟล์
      // Destination URL
      var url = "http://192.168.1.52/stockapi/public/api/v1/categoryupload";

      // File for Upload
      var targetPath = this.pathForImage(this.lastImage);

      // File name only
      var filename = this.lastImage;

      var options = {
        fileKey: "file",
        fileName: filename,
        chunkedMode: false,
        mimeType: "multipart/form-data",
        params: { 'fileName': filename }
      };

      const fileTransfer: TransferObject = this.transfer.create();

      this.loading = this.loadingCtrl.create({
        content: 'Uploading...',
      });

      this.loading.present();

      // Use the FileTransfer to upload the image
      fileTransfer.upload(targetPath, url, options).then(data => {
        this.loading.dismissAll()
        this.presentToast('Image succesful uploaded.');

        // ส่งไปยังเว็บ API
        this.webAPI.editData(this.dataCategory, "stock/category/"+this.id).then((result) => {
          if (result !== null) {
            this.presentToast("บันทึกรายการเรียบร้อยแล้ว");
            this.navCtrl.pop();
          } else {
            this.presentToast("ผิดพลาด ไม่สามารถบันทึกรายการได้");
          }
        });

      }, err => {
        this.loading.dismissAll()
        this.presentToast('Error while uploading file.');
      });
    } else {
      // ไม่ได้อัพโหลดไฟล์เข้ามา
      // ส่งไปยังเว็บ API
      this.webAPI.editData(this.dataCategory, "stock/category/"+this.id).then((result) => {
        if (result !== null) {
          this.presentToast("บันทึกรายการเรียบร้อยแล้ว");
          this.navCtrl.pop();
        } else {
          this.presentToast("ผิดพลาด ไม่สามารถบันทึกรายการได้");
        }
      });
    }
  }

}
