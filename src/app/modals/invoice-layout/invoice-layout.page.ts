import { Component, OnInit } from '@angular/core';
import { Items } from '../../models/item';
import { NavParams, ModalController } from '@ionic/angular';
import { CommonService } from '../../services/common.service';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
  selector: 'app-invoice-layout',
  templateUrl: './invoice-layout.page.html',
  styleUrls: ['./invoice-layout.page.scss'],
})
export class InvoiceLayoutPage implements OnInit {
  inv = '';
  plate = '';
  date = '';
  items: Items[] = null;
  total = 0;
  cash = 0;

  constructor(
    private navParams: NavParams,
    private modalController: ModalController,
    private commonService: CommonService
  ) {
    this.inv = this.navParams.get('inv');
    this.items = this.navParams.get('items');
    this.plate = this.navParams.get('plate');
    this.cash = this.navParams.get('cash');
    this.date = this.commonService.getTime();
    this.total = 0;
    this.items.forEach(item => {
      this.total += item.price * item.qty;
    });
  }

  ngOnInit() {
  }

  close() {
    this.modalController.dismiss();
  }

}
