import { CommonModule } from '@angular/common';
import { Component, Optional } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { App } from '@capacitor/app';
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
  IonRouterOutlet,
  Platform
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

  clientName: string = '';
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
    private profileService: ProfileService,
    private platform: Platform,
    @Optional() private routerOutlet?: IonRouterOutlet
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

    // this.backButtonInit();
    this.checkSession();
    this.getEnvironment();
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

  // backButtonInit() {
  //   this.platform.backButton.subscribeWithPriority(-1, () => {
  //     if (!this.routerOutlet?.canGoBack()) {
  //       App.exitApp();
  //     }
  //   });
  // }

  getEnvironment() {
    this.clientName = environment.clientName;
    this.appVersion = environment.version;
  }

}
