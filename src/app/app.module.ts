import { NgModule, ErrorHandler, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CategoryPage } from '../pages/category/category';
import { StockPage } from '../pages/stock/stock';
import { SettingPage } from '../pages/setting/setting';
import { WebapiserviceProvider } from '../providers/webapiservice/webapiservice';
import { HttpModule } from '@angular/http';
import { AddcategoryPage } from '../pages/addcategory/addcategory';

// Modue ถ่ายภาพและจัดการไฟล์
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { EditcategoryPage } from '../pages/editcategory/editcategory';
import { GlobalProvider } from '../providers/global/global';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    CategoryPage,
    StockPage,
    SettingPage,
    AddcategoryPage,
    EditcategoryPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    CategoryPage,
    StockPage,
    SettingPage,
    AddcategoryPage,
    EditcategoryPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    WebapiserviceProvider,
    File,
    Transfer,
    Camera,
    FilePath,
    GlobalProvider, 
  ]
})
export class AppModule {}
enableProdMode();