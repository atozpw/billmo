import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { addIcons } from 'ionicons';
import { defineCustomElement as defineLoading } from '@ionic/core/components/ion-loading.js';
import { defineCustomElement as defineToast } from '@ionic/core/components/ion-toast.js';
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
import { AuthService } from './services/auth.service';
import { ProfileService } from './services/profile.service';

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

    this.authService.authenticated();
    // this.checkSession();
  }

  checkSession() {
    this.profileService.get()
      .subscribe((response) => {
        if (response.status == 401) {
          this.router.navigate(['/login']);
        }
      });
  }
}
