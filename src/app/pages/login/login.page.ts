import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Device } from '@capacitor/device';
import { ToastController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import {
  IonContent,
  IonInput,
  IonList,
  IonItem,
  IonButton,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonInput,
    IonList,
    IonItem,
    IonButton,
    CommonModule,
    FormsModule
  ]
})
export class LoginPage implements OnInit {

  username: string = '';
  password: string = '';
  deviceId: string = '';

  loading: any;

  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private authService: AuthService
  ) {
    if (this.authService.isAuthenticated) {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit() {
    this.getDeviceId();
  }

  login() {
    this.showLoading();
    let data = {
      username: this.username,
      password: this.password,
      deviceId: this.deviceId
    };
    this.authService.login(data)
      .subscribe((response) => {
        this.hideLoading();
        if (response.status == 200) {
          this.authService.storeAuthentication(response.data.data);
          this.router.navigate(['/home']);
        }
        else if (response.status == 401) {
          let token = response.data.data.token;
          this.router.navigate(['/register'], { queryParams: { token: token } });
        }
        else {
          this.presentToast(response.data.responseMessage);
        }
      });
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

}
