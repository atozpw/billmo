import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButtons, IonItem, IonLabel, IonList, IonCheckbox, IonImg, IonSearchbar, IonModal, IonAvatar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.page.html',
  styleUrls: ['./customer-detail.page.scss'],
  standalone: true,
  imports: [IonSearchbar, IonImg, IonCheckbox, IonList, IonLabel, IonItem, IonButtons, IonBackButton, IonContent, IonHeader, IonTitle, IonToolbar, IonModal, IonAvatar, CommonModule, FormsModule]
})
export class CustomerDetailPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
