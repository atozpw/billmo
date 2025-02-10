import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonInput, IonButton, IonIcon, IonList, IonItem, IonListHeader, IonLabel, IonText } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { search } from 'ionicons/icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
  standalone: true,
  imports: [IonText, IonLabel, IonListHeader, IonItem, IonList, IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonInput, IonButton, IonIcon, CommonModule, FormsModule]
})
export class PaymentPage {

  customerId: string = '';

  constructor(private router: Router) {
    addIcons({ search })
  }

  search() {
    this.router.navigate([`/payment/${this.customerId}`]);
  }

}
