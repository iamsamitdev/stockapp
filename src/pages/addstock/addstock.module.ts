import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddstockPage } from './addstock';

@NgModule({
  declarations: [
    AddstockPage,
  ],
  imports: [
    IonicPageModule.forChild(AddstockPage),
  ],
})
export class AddstockPageModule {}
