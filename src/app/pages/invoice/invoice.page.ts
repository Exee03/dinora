import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { InvoiceLayoutPage } from 'src/app/modals/invoice-layout/invoice-layout.page';
import { Items } from 'src/app/models/item';
import { CommonService } from 'src/app/services/common.service';
import { InvoiceService } from 'src/app/services/invoice.service';
import { KeypadPage } from 'src/app/modals/keypad/keypad.page';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.page.html',
  styleUrls: ['./invoice.page.scss'],
})
export class InvoicePage implements OnInit {

  items: Items[] = [];
  plate = '';
  inv = '';
  services: Items[] = [
    {
      desc : 'Cuci Luar',
      type : 'Single',
      price : 20,
      selected : false
    },
    {
      desc : 'Cuci Dalam',
      type : 'Single',
      price : 15,
      selected : false
    },
    {
      desc : 'Cuci Luar',
      type : 'Double',
      price : 20,
      selected : false
    },
    {
      desc : 'Cuci Dalam',
      type : 'Double',
      price : 15,
      selected : false
    },
    {
      desc : 'Cuci Enjin',
      price : 40,
      selected : false
    },
    {
      desc : 'Cuci Kusyen',
      price : 10,
      selected : false
    }
  ];

  constructor(
    private modalController: ModalController,
    private commonService: CommonService,
    private invoiceService: InvoiceService
  ) {
    this.commonService.showInvoice(true);
    this.invoiceService.plate.subscribe(plate => this.plate = plate.toUpperCase());
    this.invoiceService.service.subscribe(item => {
      this.items = item;
      this.colorizeSelected(item);
    });
  }

  ngOnInit() {
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy() {
    this.commonService.showInvoice(false);
  }

  async addPlate() {
    const modal = await this.modalController.create({
      component: KeypadPage,
      componentProps: {
        word: this.plate,
        from: 'plate',
        space: true
      }
    });
    return await modal.present();
  }

  selectService(service: Items) {
    const selectedService = this.items.find(item => item.desc === service.desc && item.type === service.type);
    if (selectedService === undefined) {
      service.qty = 1;
      this.items.push(service);
    } else {
      this.items.forEach(item => {
        if (item.desc === selectedService.desc && item.type === service.type) {
          item.qty += 1;
        }
      });
    }
    this.invoiceService.service.next(this.items);
  }

  colorizeSelected(items: Items[]) {
    this.services.forEach(service => {
      if (items.includes(service)) { service.selected = true; } else { service.selected = false; }
    });
  }

}
