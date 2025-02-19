import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { addIcons } from 'ionicons';
import { defineCustomElement as defineLoading } from '@ionic/core/components/ion-loading.js';
import { defineCustomElement as defineToast } from '@ionic/core/components/ion-toast.js';
import { defineCustomElement as defineModal } from '@ionic/core/components/ion-modal.js';
import { AuthService } from './services/auth.service';
import { ProfileService } from './services/profile.service';
import { environment } from 'src/environments/environment';
import {
  IonApp,
  IonSplitPane,
  IonMenu,
  IonContent,
  IonList,
  IonListHeader,
  IonNote,
  IonMenuToggle,
  IonItem,
  IonIcon,
  IonLabel,
  IonRouterOutlet
} from '@ionic/angular/standalone';
import {
  home,
  homeOutline,
  people,
  peopleOutline,
  wallet,
  walletOutline,
  documentText,
  documentTextOutline,
  person,
  personOutline,
  settings,
  settingsOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule,
    IonApp,
    IonSplitPane,
    IonMenu,
    IonContent,
    IonList,
    IonListHeader,
    IonNote,
    IonMenuToggle,
    IonItem,
    IonIcon,
    IonLabel,
    IonRouterOutlet
  ],
})
export class AppComponent {

  appVersion: string = '';

  public appPages = [
    { title: 'Beranda', url: '/home', icon: 'home' },
    { title: 'Info Pelanggan', url: '/customer', icon: 'people' },
    { title: 'Pembayaran', url: '/payment', icon: 'wallet' },
    { title: 'Penerimaan', url: '/report', icon: 'document-text' },
    { title: 'Akun Saya', url: '/account', icon: 'person' },
    { title: 'Pengaturan', url: '/setting', icon: 'settings' },
  ];

  constructor(
    private router: Router,
    private authService: AuthService,
    private profileService: ProfileService
  ) {
    defineLoading();
    defineToast();
    defineModal();

    addIcons({
      home,
      homeOutline,
      people,
      peopleOutline,
      wallet,
      walletOutline,
      documentText,
      documentTextOutline,
      person,
      personOutline,
      settings,
      settingsOutline
    });

    this.checkSession();
    this.getVersion();
  }

  async checkSession() {
    await this.authService.authenticated();

    this.profileService.get()
      .subscribe((response) => {
        if (response.status == 401) {
          this.authService.isAuthenticated = false;
          this.router.navigate(['/login']);
        }
      });
  }

  getVersion() {
    this.appVersion = environment.version;
  }

}
