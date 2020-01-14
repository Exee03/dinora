import { Injectable } from '@angular/core';
import { AlertController, ToastController, LoadingController, MenuController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private alertController: AlertController,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private menuController: MenuController
  ) { }

  getTime() {
    const dateTime = new Date();
    // tslint:disable-next-line: max-line-length
    return dateTime.toLocaleString();
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  async loading(isDone: boolean, from: string) {
    if (isDone) {
      console.log('Stop loading:', from);
      this.loadingController.dismiss();
    } else {
      console.log('Start loading:', from);
      const loading = await this.loadingController.create({
        translucent: true
      });
      await loading.present();
    }
  }

  async showAlert(header, subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header,
      subHeader,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async showToast(text: string) {
    this.toastController.getTop();
    const toast = await this.toastController.create({
      message: text,
      duration: 2000
    });
    return toast.present();
  }

  async showAlertError(header, subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header,
      subHeader,
      message,
      buttons: ['OK']
    });
    // this.loading(true, message);
    await alert.present();
  }

  capitalize(str: string) {
    // tslint:disable-next-line: only-arrow-functions
    return str.replace(/\w\S*/g, function(txt) {return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
  }

  concatenateNum(a, b, base) {
    if (typeof base === 'undefined') {
        base = 10;
    }
    return a * Math.pow(base, Math.floor(Math.log(b) / Math.log(base)) + 1) + b;
}

  showInvoice(shouldShow: boolean) {
    this.menuController.enable(shouldShow, 'invoice');
    if (shouldShow === true) {

    } else {

    }
  }


}
