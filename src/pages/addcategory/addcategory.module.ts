import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddcategoryPage } from './addcategory';

@NgModule({
  declarations: [
    AddcategoryPage,
  ],
  imports: [
    IonicPageModule.forChild(AddcategoryPage),
  ],
})
export class AddcategoryPageModule {}
