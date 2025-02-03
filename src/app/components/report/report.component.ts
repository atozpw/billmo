import { Component, OnInit } from '@angular/core';
import { IonContent, LoadingController } from '@ionic/angular/standalone';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  standalone: true,
  imports: [IonContent],
})
export class ReportComponent implements OnInit {

  date: string = '';
  loading: any;

  constructor(
    private loadingCtrl: LoadingController,
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
        console.log(response.data.data);
      });
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
