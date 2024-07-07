import { Component, OnInit } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButtons, IonItem, IonLabel, IonList, IonCheckbox, IonImg, IonSearchbar, IonModal, IonAvatar, IonButton, IonInput, ModalController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-bill-detail',
  templateUrl: './bill-detail.component.html',
  styleUrls: ['./bill-detail.component.scss'],
  standalone: true,
  imports: [IonButton, IonSearchbar, IonImg, IonCheckbox, IonList, IonLabel, IonItem, IonButtons, IonBackButton, IonContent, IonHeader, IonTitle, IonToolbar, IonModal, IonAvatar, IonInput]
})
export class BillDetailComponent implements OnInit {

  name?: string;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.name, 'confirm');
  }

}
