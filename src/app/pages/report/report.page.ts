import { Component, OnInit } from '@angular/core';
import { CommonModule, formatNumber, formatDate } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { close } from 'ionicons/icons';
import { ReportService } from 'src/app/services/report.service';
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
  IonLabel,
  ModalController,
  LoadingController,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
  standalone: true,
  imports: [
    IonLabel,
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
    CommonModule,
    FormsModule
  ]
})
export class ReportPage implements OnInit {

  reports: any = [];

  fullDate: string = '';
  trxTotalAmount: number = 0;

  loading: any;

  constructor(
    private loadingCtrl: LoadingController,
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
        this.calculateTotalAmount(response.data.data);
      });
  }

  calculateTotalAmount(data: any) {
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i]) {
        sum += parseInt(data[i].trxTotal || '0');
      }
    }
    this.trxTotalAmount = sum;
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

  formatNumber(value: number): string {
    return formatNumber(value, 'en-US');
  }

  formatNumberFromString(value: string): string {
    return formatNumber(parseInt(value), 'en-US');
  }

}
