import { Component } from '@angular/core';

import { Platform, ModalController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { CommonService } from './services/common.service';
import { InvoiceService } from './services/invoice.service';
import { Items } from './models/item';
import { NumpadPage } from './modals/numpad/numpad.page';
import { InvoiceLayoutPage } from './modals/invoice-layout/invoice-layout.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: 'home'
    },
    {
      title: 'Cuci Bas',
      url: '/invoice',
      icon: 'bus'
    }
  ];
  items: Items[] = [];
  total = 0;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private commonService: CommonService,
    private invoiceService: InvoiceService,
    private modalController: ModalController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.commonService.showInvoice(false);
      this.invoiceService.service.subscribe(service => {
        this.items = service;
        this.total = 0;
        service.forEach(item => {
          this.total += item.price * item.qty;
        });
      });
    });
  }

  async pay() {
    if (this.items.length !== 0 && this.invoiceService.plate.value !== '') {
      const modal = await this.modalController.create({
        component: NumpadPage,
        componentProps: {
          num: 0,
          from: 'pay',
          index: 0
        }
      });
      return await modal.present();
    } else {
      // tslint:disable-next-line: max-line-length
      if (this.items.length === 0 && this.invoiceService.plate.value === '') { this.commonService.showToast('Please enter the Plate No. and select the Service'); } else
      if (this.items.length === 0) { this.commonService.showToast('No service.'); } else
      if (this.invoiceService.plate.value === '') { this.commonService.showToast('No plate number.'); } else {
        this.commonService.showToast('Please enter the Plate No. and select the Service');
      }
    }
  }

  addQty(item: Items) {
    const newService = this.invoiceService.service.value;
    newService.forEach(service => {
      if (service.desc === item.desc && service.type === item.type) {
        service.qty += 1;
      }
    });
    this.invoiceService.service.next(newService);
  }

  removeQty(item: Items) {
    const newService = this.invoiceService.service.value;
    newService.forEach(service => {
      if (service.desc === item.desc && service.type === item.type) {
        service.qty -= 1;
      }
    });
    const removeIndex = newService.map((service) => service.qty).indexOf(0);
    if (removeIndex >= 0) {
      this.delete(removeIndex);
    }
    this.invoiceService.service.next(newService);
  }

  async editQty(qty: number, i: number) {
    const modal = await this.modalController.create({
      component: NumpadPage,
      componentProps: {
        num: qty,
        from: 'editQty',
        index: i
      }
    });
    return await modal.present();
  }

  delete(index: number) {
    console.log(index);
    const newService = this.invoiceService.service.value;
    newService.splice(index, 1);
    this.invoiceService.service.next(newService);
  }
}
