import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { documentTextOutline, personOutline, home, homeOutline, person, settings, settingsOutline, documentText, wallet, walletOutline, toggle, toggleOutline, people, peopleOutline } from 'ionicons/icons';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet],
})
export class AppComponent {
  public appPages = [
    { title: 'Beranda', url: '/home', icon: 'home' },
    { title: 'Info Pelanggan', url: '/customer', icon: 'people' },
    { title: 'Buka / Tutup Loket', url: '/counter-status', icon: 'toggle' },
    { title: 'Pembayaran', url: '/payment', icon: 'wallet' },
    { title: 'Penerimaan', url: '/report', icon: 'document-text' },
    { title: 'Akun Saya', url: '/account', icon: 'person' },
    { title: 'Pengaturan', url: '/setting', icon: 'settings' },
  ];
  constructor(
    private authService: AuthService
  ) {
    addIcons({ home, homeOutline, people, peopleOutline, toggle, toggleOutline, wallet, walletOutline, documentText, documentTextOutline, person, personOutline, settings, settingsOutline });
    this.authService.getToken();
  }
}
