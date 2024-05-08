import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
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
    console.log('page login init');
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
          this.authService.storeAuthentication(response.data.data);
          this.router.navigate(['/home']);
        }
        else {

        }
      });
  }

}
