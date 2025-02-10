import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, LoadingController, IonToolbar, IonHeader, IonButtons, IonBackButton, IonTitle, IonList, IonItem, IonLabel, IonButton, IonIcon, ModalController } from '@ionic/angular/standalone';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  standalone: true,
  imports: [IonIcon, IonButton, IonLabel, IonItem, IonList, IonTitle, IonBackButton, IonButtons, IonHeader, IonToolbar, IonContent, CommonModule],
})
export class ReportComponent implements OnInit {

  date: string = '';

  reports: any;
  loading: any;

  constructor(
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private reportService: ReportService,
  ) { }

  ngOnInit() {
    this.getReports();
  }

  getReports() {
    this.showLoading();
    this.reportService.all(this.date)
      .subscribe((response) => {
        this.hideLoading();
        this.reports = response.data.data;
        console.log(response.data.data);
      });
  }

  close() {
    return this.modalCtrl.dismiss();
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

}
