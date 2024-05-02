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
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  login() {
    let data = {
      username: this.username,
      password: this.password,
      deviceId: '123456'
    };
    this.authService.login(data)
      .subscribe((auth) => {
        console.log(auth.data.data);
        this.setStorage(auth.data.data);
      });
    // this.router.navigate(['/home']);
  }

  setStorage(value: any) {
    Preferences.set({ key: 'auth', value: JSON.stringify(value) });
  }

}
