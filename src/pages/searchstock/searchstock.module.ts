import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchstockPage } from './searchstock';

@NgModule({
  declarations: [
    SearchstockPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchstockPage),
  ],
})
export class SearchstockPageModule {}
