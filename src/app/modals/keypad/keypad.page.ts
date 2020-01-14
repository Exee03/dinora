import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
  selector: 'app-keypad',
  templateUrl: './keypad.page.html',
  styleUrls: ['./keypad.page.scss'],
})
export class KeypadPage implements OnInit {

  from = '';
  word = '';
  withSpace = false;

  constructor(
    private navParams: NavParams,
    private invoiceService: InvoiceService,
    private modalController: ModalController
    ) {
      this.from = this.navParams.get('from');
      this.word = this.navParams.get('word');
      this.withSpace = this.navParams.get('space');
    }

  ngOnInit() {
  }

  keyboard(text: string) {
    if (this.word === '') { this.word = text.toUpperCase(); } else { this.word = this.word + text.toUpperCase(); }
  }

  keySpecial(text: string) {
    if (text === 'clr') { this.word = ''; } else if (text === 'del') {
      this.word = this.word.slice(0, -1);
    }
  }

  submit() {
    if (this.from === 'plate') {
      this.invoiceService.plate.next(this.word);
      this.modalController.dismiss();
    } else if (this.from === 'pay') {
      // this.invoiceService.payService(this.num);
    }
  }

  close() {
    this.modalController.dismiss();
  }

}
