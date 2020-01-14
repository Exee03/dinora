import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
  selector: 'app-numpad',
  templateUrl: './numpad.page.html',
  styleUrls: ['./numpad.page.scss'],
})
export class NumpadPage implements OnInit {
  from = '';
  num = 0;
  index = 0;
  frontText = '';

  constructor(
    private navParams: NavParams,
    private commonService: CommonService,
    private invoiceService: InvoiceService,
    private modalController: ModalController
  ) {
    this.from = this.navParams.get('from');
    this.num = this.navParams.get('num');
    this.index = this.navParams.get('index');
    if (this.from === 'pay') {
      this.frontText = 'RM';
    }
  }

  ngOnInit() {
  }

  keyNum(text: number) {
    const newNum = this.num.toString() + text.toString();
    // tslint:disable-next-line: radix
    this.num = parseInt(newNum);
  }

  keySpecial(text: string) {
    if (text === 'c') { this.num = 0; } else if (text === 'del') {
      if (this.num > 10) {
        let newNum = this.num.toString();
        newNum = newNum.slice(0, -1);
        // tslint:disable-next-line: radix
        this.num = parseInt(newNum);
      } else {
        this.num = 0;
      }
    }
  }

  submit() {
    if (this.from === 'editQty') {
      const newService = this.invoiceService.service.value;
      newService[this.index].qty = this.num;
      this.invoiceService.service.next(newService);
      this.modalController.dismiss();
    } else if (this.from === 'pay') {
      this.invoiceService.payService(this.num);
      this.modalController.dismiss();
    }
  }

  close() {
    this.modalController.dismiss();
  }

}
