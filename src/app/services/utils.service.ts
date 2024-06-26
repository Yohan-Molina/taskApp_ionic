import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  AlertController,
  AlertOptions,
  LoadingController,
  LoadingOptions,
  ToastController,
  ToastOptions,
} from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor(
    private loadingController: LoadingController,
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController
  ) {}

  // Loading...
  async presentLoading(opts?: LoadingOptions) {
    const loading = await this.loadingController.create(opts);
    await loading.present();
  }

  async dismissLoading() {
    return await this.loadingController.dismiss();
  }

  // LocalStorage
  setElementInLocalstorage(key: string, element: any) {
    return localStorage.setItem(key, JSON.stringify(element));
  }

  getElementInLocalstorage(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }

  // Toast...
  async presentToast(opts?: ToastOptions) {
    const toast = await this.toastController.create(opts);
    toast.present();
  }

  // Routes
  routerLink(url: string) {
    return this.router.navigateByUrl(url);
  }

  // Alerts
  async presentAlert(opts?: AlertOptions) {
    const alert = await this.alertController.create(opts);
    await alert.present();
  }
}
