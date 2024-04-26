import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonList, IonItem, IonCheckbox, IonNote, IonLabel, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.page.html',
  styleUrls: ['./payment-detail.page.scss'],
  standalone: true,
  imports: [IonButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonList, IonItem, IonCheckbox, IonNote, IonLabel, CommonModule, FormsModule]
})
export class PaymentDetailPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
