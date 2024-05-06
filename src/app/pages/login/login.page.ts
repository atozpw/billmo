import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Preferences } from '@capacitor/preferences';
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
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
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
export class LoginPage implements OnInit {

  username: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    if (this.authService.isAuthenticated) {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit() {
  }

  login() {
    let data = {
      username: this.username,
      password: this.password,
      deviceId: '123456'
    };
    this.authService.login(data)
      .subscribe((response) => {
        if (response.status == 200) {
          this.setStorage(response.data.data);
          this.authService.isAuthenticated = true;
          this.router.navigate(['/home']);
        }
        else {

        }
      });
  }

  setStorage(value: any) {
    Preferences.set({ key: 'auth', value: JSON.stringify(value) });
  }

}
