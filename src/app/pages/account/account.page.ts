import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { Device } from '@capacitor/device';
import { LoadingController } from '@ionic/angular';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonList, IonLabel, IonItem, IonAvatar, IonGrid, IonCol, IonRow, IonButton } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: true,
  imports: [IonButton, IonRow, IonCol, IonGrid, IonItem, IonLabel, IonList, IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonAvatar, CommonModule, FormsModule]
})
export class AccountPage implements OnInit {

  profile?: any;
  deviceId?: string;
  loading: any;

  constructor(
    private router: Router,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private profileService: ProfileService
  ) { }

  ngOnInit() {
    this.getProfile();
    this.getDeviceId();
  }

  getProfile() {
    this.showLoading();
    this.profileService.get()
      .subscribe((response) => {
        if (response.status == 200) {
          this.profile = response.data.data;
        }
        this.hideLoading();
      });
  }

  async getDeviceId() {
    const device = await Device.getId();
    this.deviceId = device.identifier;
  }

  logout() {
    Preferences.remove({ key: 'auth' });
    this.authService.isAuthenticated = false;
    this.router.navigate(['/login']);
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
