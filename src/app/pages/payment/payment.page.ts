import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonInput, IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { search } from 'ionicons/icons';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonInput, IonButton, IonIcon, CommonModule, FormsModule]
})
export class PaymentPage implements OnInit {

  constructor() {
    addIcons({ search })
  }

  ngOnInit() {
  }

}
