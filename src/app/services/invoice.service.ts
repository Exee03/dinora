import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { Items } from '../models/item';
import { BehaviorSubject } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { InvoiceLayoutPage } from '../modals/invoice-layout/invoice-layout.page';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  service = new BehaviorSubject<Items[]>([]);
  plate = new BehaviorSubject<string>('');
  sales = 0;
  invNoNum = 0;
  invNoChar = 'B';
  invNoFull = '';

  constructor(private modalController: ModalController) {}

  generateInvNo() {
    this.invNoNum += 1;
    let invNoString = this.invNoNum.toString();
    switch (invNoString.length) {
      case 1:
        invNoString = '0000' + invNoString;
        break;
      case 2:
        invNoString = '000' + invNoString;
        break;
      case 3:
        invNoString = '00' + invNoString;
        break;
      case 4:
        invNoString = '0' + invNoString;
        break;
      default:
        break;
    }
    this.invNoFull = this.invNoChar + ' ' + invNoString;
  }

  async payService(cash: number) {
    let total = 0;
    this.service.value.forEach(item => {
      total += item.price * item.qty;
    });
    this.sales += cash - total;
    this.generateInvNo();
    const modal = await this.modalController.create({
      component: InvoiceLayoutPage,
      cssClass: 'invoiceModal',
      componentProps: {
        inv: this.invNoFull,
        plate: this.plate.value,
        items: this.service.value,
        cash
      }
    });
    this.clearService();
    return await modal.present();
  }

  clearService() {
    this.service.next([]);
    this.plate.next('');
  }
}
