import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Device } from '@capacitor/device';
import { ToastController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonInput,
  IonList,
  IonItem,
  IonButton
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonInput,
    IonList,
    IonItem,
    IonButton,
    CommonModule,
    FormsModule
  ]
})
export class RegisterPage implements OnInit {

  appVersion: string = '';

  verificationCode: string = '';
  deviceId: string = '';
  token: string = '';

  loading: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private authService: AuthService
  ) {
    this.getParamToken();
  }

  ngOnInit() {
    this.getDeviceId();
    this.getVersion();
  }

  register() {
    this.showLoading();
    let data = {
      verificationCode: this.verificationCode,
      deviceId: this.deviceId
    };
    this.authService.register(data, this.token)
      .subscribe((response) => {
        this.hideLoading();
        this.presentToast(response.data.responseMessage);
        if (response.status == 200) {
          this.router.navigate(['/login']);
        }
      });
  }

  getParamToken() {
    this.token = this.activatedRoute.snapshot.queryParamMap.get('token') || '';
  }

  async getDeviceId() {
    const device = await Device.getId();
    this.deviceId = device.identifier;
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    await toast.present();
  }

  async showLoading() {
    this.loading = await this.loadingCtrl.create({
      mode: 'ios'
    });
    this.loading.present();
  }

  hideLoading() {
    this.loading.dismiss();
  }

  getVersion() {
    this.appVersion = environment.version;
  }

}
