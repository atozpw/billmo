import { Component, OnInit } from '@angular/core';
import { CommonModule, formatNumber, formatDate } from '@angular/common';
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
  LoadingController, IonLabel, IonFooter
} from '@ionic/angular/standalone';
import { ReportComponent } from 'src/app/components/report/report.component';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
  standalone: true,
  imports: [IonFooter, IonLabel,
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

  fullDate: string = '';
  trxTotalAmount: number = 0;

  reports: any;
  loading: any;

  constructor(
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private reportService: ReportService,
  ) {
    addIcons({ close })
  }

  ngOnInit() {
    const date = new Date();
    this.fullDate = formatDate(date, 'yyyy-MM-dd', 'en-US');
    this.getReports();
  }

  getReports() {
    this.showLoading();
    this.reportService.all(this.fullDate)
      .subscribe((response) => {
        this.hideLoading();
        this.reports = response.data.data;
      });
  }

  trackItems(index: number, itemObject: any) {
    return itemObject.id;
  }

  async showLoading() {
    this.loading = await this.loadingCtrl.create({
      mode: 'ios'
    });
    this.loading.present();
  }

  hideLoading() {
    this.loading.dismiss();
  }

  formatNumberFromString(value: string): string {
    return formatNumber(parseInt(value), 'en-US');
  }

}
