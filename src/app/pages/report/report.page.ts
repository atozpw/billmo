import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { close } from 'ionicons/icons';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonInput,
  IonList,
  IonItem,
  IonButton,
  IonModal,
  IonIcon,
  IonDatetimeButton,
  IonDatetime,
  IonSelect,
  IonSelectOption
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonModal,
    IonInput,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonList,
    IonItem,
    IonButton,
    IonDatetimeButton,
    IonDatetime,
    IonSelect,
    IonSelectOption,
    CommonModule,
    FormsModule
  ]
})
export class ReportPage implements OnInit {

  constructor() {
    addIcons({ close })
  }

  ngOnInit() {
  }

  cancel() {
  }

  onWillDismiss(event: Event) {
    console.log(event);
  }

}
