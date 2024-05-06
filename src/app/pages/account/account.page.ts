import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonList, IonLabel, IonItem, IonAvatar, IonGrid, IonCol, IonRow, IonButton } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: true,
  imports: [IonButton, IonRow, IonCol, IonGrid, IonItem, IonLabel, IonList, IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonAvatar, CommonModule, FormsModule]
})
export class AccountPage implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  logout() {
    Preferences.remove({ key: 'auth' });
    this.authService.isAuthenticated = false;
    this.router.navigate(['/login']);
  }

}
