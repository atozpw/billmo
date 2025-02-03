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
  IonSelectOption,
  ModalController,
} from '@ionic/angular/standalone';
import { ReportComponent } from 'src/app/components/report/report.component';

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

  date: string = '';
  month: string = '';
  year: string = '';

  constructor(
    private modalCtrl: ModalController,
  ) {
    addIcons({ close })
  }

  ngOnInit() {
    const now = new Date();
    this.date = now.getDate().toString();
    this.month = (now.getMonth() + 1).toString();
    this.year = now.getFullYear().toString();
  }

  cancel() {
  }

  async showReport() {
    const date = this.date.length === 1 ? "0" + this.date : this.date;
    const month = this.month.length === 1 ? "0" + this.month : this.month;
    const year = this.year;

    const fullDate = year + "-" + month + "-" + date;

    const modal = await this.modalCtrl.create({
      component: ReportComponent,
      componentProps: { date: fullDate },
    });

    modal.present();
  }

  onWillDismiss(event: Event) {
    console.log(event);
  }

}
