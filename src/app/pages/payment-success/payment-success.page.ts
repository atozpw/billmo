import { Component, OnInit } from '@angular/core';
import { CommonModule, formatNumber } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BleClient, textToDataView } from '@capacitor-community/bluetooth-le';
import { Preferences } from '@capacitor/preferences';
import { PaymentService } from 'src/app/services/payment.service';
import { ReceiptService } from 'src/app/services/receipt.service';
import {
  IonContent,
  IonButton,
  IonText,
  IonModal,
  IonInput,
  AlertController,
  ToastController
} from '@ionic/angular/standalone';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.page.html',
  styleUrls: ['./payment-success.page.scss'],
  standalone: true,
  imports: [
    IonInput,
    IonModal,
    IonText,
    IonContent,
    IonButton,
    CommonModule,
    FormsModule,
  ]
})
export class PaymentSuccessPage implements OnInit {

  payment?: any;

  deviceId: string = '';
  serviceUuid: string = '';
  characteristicUuid: string = '';

  paymentId: string = '';
  whatsappNumber: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private paymentService: PaymentService,
    private receiptService: ReceiptService,
    private alertController: AlertController,
    private toastCtrl: ToastController
  ) {
    this.paymentId = this.route.snapshot.paramMap.get('id') || '0';
  }

  async ngOnInit() {
    await this.getDeviceId();
    await this.getServiceUuid();
    await this.getCharacteristicUuid();
    await this.getPayment();
  }

  async getPayment() {
    this.paymentService.find(this.paymentId)
      .subscribe((payment) => {
        this.payment = payment.data.data;
      });
  }

  async bluetoothConnect(deviceId: string) {
    await BleClient.connect(deviceId);
  }

  async bluetoothDisconnect(deviceId: string) {
    await BleClient.disconnect(deviceId);
  }

  async getDeviceId() {
    const { value } = await Preferences.get({ key: 'bluetoothDeviceId' });
    this.deviceId = value || "";
  }

  async getServiceUuid() {
    const { value } = await Preferences.get({ key: 'bluetoothServiceUuid' });
    this.serviceUuid = value || "";
  }

  async getCharacteristicUuid() {
    const { value } = await Preferences.get({ key: 'bluetoothCharacteristicUuid' });
    this.characteristicUuid = value || "";
  }

  async printLineFeed(deviceId: string, serviceUuid: string, characteristicUuid: string) {
    await BleClient.write(deviceId, serviceUuid, characteristicUuid, new DataView((new Uint8Array([10])).buffer));
  }

  async printTurnOnBold(deviceId: string, serviceUuid: string, characteristicUuid: string) {
    const boldOn = new Uint8Array([27, 69, 1]);
    await BleClient.write(deviceId, serviceUuid, characteristicUuid, new DataView(boldOn.buffer));
  }

  async printTurnOffBold(deviceId: string, serviceUuid: string, characteristicUuid: string) {
    const boldOff = new Uint8Array([27, 69, 0]);
    await BleClient.write(deviceId, serviceUuid, characteristicUuid, new DataView(boldOff.buffer));
  }

  async printFeedLeft(deviceId: string, serviceUuid: string, characteristicUuid: string) {
    const left = new Uint8Array([27, 97, 0]);
    await BleClient.write(deviceId, serviceUuid, characteristicUuid, new DataView(left.buffer));
  }

  async printFeedCenter(deviceId: string, serviceUuid: string, characteristicUuid: string) {
    const center = new Uint8Array([27, 97, 1]);
    await BleClient.write(deviceId, serviceUuid, characteristicUuid, new DataView(center.buffer));
  }

  async printFeedRight(deviceId: string, serviceUuid: string, characteristicUuid: string) {
    const right = new Uint8Array([27, 97, 2]);
    await BleClient.write(deviceId, serviceUuid, characteristicUuid, new DataView(right.buffer));
  }

  async printWriteData(deviceId: string, serviceUuid: string, characteristicUuid: string, text: string) {
    await BleClient.write(deviceId, serviceUuid, characteristicUuid, textToDataView(text));
  }

  async printUnderLine(deviceId: string, serviceUuid: string, characteristicUuid: string) {
    await BleClient.write(deviceId, serviceUuid, characteristicUuid, textToDataView('-'.repeat(30)));
  }

  async printNewEmptyLine(deviceId: string, serviceUuid: string, characteristicUuid: string) {
    await BleClient.write(deviceId, serviceUuid, characteristicUuid, textToDataView(`${' '.repeat(30)}\n`));
  }

  async buttonPrintReceipt() {
    await this.bluetoothConnect(this.deviceId);

    await this.printTurnOnBold(this.deviceId, this.serviceUuid, this.characteristicUuid);
    await this.printWriteData(this.deviceId, this.serviceUuid, this.characteristicUuid, environment.clientName.toUpperCase());
    await this.printLineFeed(this.deviceId, this.serviceUuid, this.characteristicUuid);
    await this.printWriteData(this.deviceId, this.serviceUuid, this.characteristicUuid, `NPWP : ${environment.clientNpwp}`);
    await this.printLineFeed(this.deviceId, this.serviceUuid, this.characteristicUuid);
    await this.printUnderLine(this.deviceId, this.serviceUuid, this.characteristicUuid);
    await this.printTurnOffBold(this.deviceId, this.serviceUuid, this.characteristicUuid);
    await this.printLineFeed(this.deviceId, this.serviceUuid, this.characteristicUuid);

    await this.printFeedLeft(this.deviceId, this.serviceUuid, this.characteristicUuid);
    await this.printWriteData(this.deviceId, this.serviceUuid, this.characteristicUuid, `No. Trx  : ${this.payment.id}`);
    await this.printLineFeed(this.deviceId, this.serviceUuid, this.characteristicUuid);
    await this.printWriteData(this.deviceId, this.serviceUuid, this.characteristicUuid, `Waktu    : ${this.payment.trxDate}`);
    await this.printLineFeed(this.deviceId, this.serviceUuid, this.characteristicUuid);
    await this.printWriteData(this.deviceId, this.serviceUuid, this.characteristicUuid, `Kasir    : ${this.payment.cashier}`);
    await this.printLineFeed(this.deviceId, this.serviceUuid, this.characteristicUuid);
    await this.printLineFeed(this.deviceId, this.serviceUuid, this.characteristicUuid);
    await this.printWriteData(this.deviceId, this.serviceUuid, this.characteristicUuid, `No. SR   : ${this.payment.customerNo}`);
    await this.printLineFeed(this.deviceId, this.serviceUuid, this.characteristicUuid);
    await this.printWriteData(this.deviceId, this.serviceUuid, this.characteristicUuid, `Nama     : ${this.payment.customerName}`);
    await this.printLineFeed(this.deviceId, this.serviceUuid, this.characteristicUuid);
    await this.printWriteData(this.deviceId, this.serviceUuid, this.characteristicUuid, `Alamat   : ${this.payment.customerAddress}`);
    await this.printLineFeed(this.deviceId, this.serviceUuid, this.characteristicUuid);
    await this.printWriteData(this.deviceId, this.serviceUuid, this.characteristicUuid, `Golongan : ${this.payment.customerGroup}`);
    await this.printLineFeed(this.deviceId, this.serviceUuid, this.characteristicUuid);
    await this.printUnderLine(this.deviceId, this.serviceUuid, this.characteristicUuid);

    let grandTotal = 0;

    for (const bill of this.payment.billDetails) {
      await this.printLineFeed(this.deviceId, this.serviceUuid, this.characteristicUuid);
      await this.printWriteData(this.deviceId, this.serviceUuid, this.characteristicUuid, `Rekening ${bill.month} ${bill.year}`);
      await this.printLineFeed(this.deviceId, this.serviceUuid, this.characteristicUuid);
      await this.printWriteData(this.deviceId, this.serviceUuid, this.characteristicUuid, `Stand Meter  : ${bill.lastWm} - ${bill.currentWm}`);
      await this.printLineFeed(this.deviceId, this.serviceUuid, this.characteristicUuid);
      await this.printWriteData(this.deviceId, this.serviceUuid, this.characteristicUuid, `Pemakaian    : ${bill.waterUsage} m3`);
      await this.printLineFeed(this.deviceId, this.serviceUuid, this.characteristicUuid);
      await this.printWriteData(this.deviceId, this.serviceUuid, this.characteristicUuid, `Uang Air     : ${this.formatNumberFromString(bill.amount)}`);
      await this.printLineFeed(this.deviceId, this.serviceUuid, this.characteristicUuid);
      await this.printWriteData(this.deviceId, this.serviceUuid, this.characteristicUuid, `Beban Tetap  : ${this.formatNumber(parseInt(bill.adminFee) + parseInt(bill.meterCost))}`);
      await this.printLineFeed(this.deviceId, this.serviceUuid, this.characteristicUuid);
      await this.printWriteData(this.deviceId, this.serviceUuid, this.characteristicUuid, `Denda        : ${this.formatNumberFromString(bill.additionalAmount)}`);
      await this.printLineFeed(this.deviceId, this.serviceUuid, this.characteristicUuid);
      await this.printWriteData(this.deviceId, this.serviceUuid, this.characteristicUuid, `Materai      : 0`);
      await this.printLineFeed(this.deviceId, this.serviceUuid, this.characteristicUuid);
      await this.printWriteData(this.deviceId, this.serviceUuid, this.characteristicUuid, `Total        : ${this.formatNumberFromString(bill.total)}`);
      await this.printLineFeed(this.deviceId, this.serviceUuid, this.characteristicUuid);
      grandTotal += parseInt(bill.total);
    }

    await this.printUnderLine(this.deviceId, this.serviceUuid, this.characteristicUuid);
    await this.printLineFeed(this.deviceId, this.serviceUuid, this.characteristicUuid);
    await this.printWriteData(this.deviceId, this.serviceUuid, this.characteristicUuid, `Total Tag.   : ${this.formatNumber(grandTotal)}`);
    await this.printLineFeed(this.deviceId, this.serviceUuid, this.characteristicUuid);
    await this.printWriteData(this.deviceId, this.serviceUuid, this.characteristicUuid, `By. Layanan  : ${this.formatNumber(environment.clientFee)}`);
    await this.printLineFeed(this.deviceId, this.serviceUuid, this.characteristicUuid);
    await this.printWriteData(this.deviceId, this.serviceUuid, this.characteristicUuid, `Grand Total  : ${this.formatNumber(grandTotal + environment.clientFee)}`);
    await this.printLineFeed(this.deviceId, this.serviceUuid, this.characteristicUuid);
    await this.printUnderLine(this.deviceId, this.serviceUuid, this.characteristicUuid);
    await this.printLineFeed(this.deviceId, this.serviceUuid, this.characteristicUuid);
    await this.printWriteData(this.deviceId, this.serviceUuid, this.characteristicUuid, `Resi ini dibuat oleh komputer`);
    await this.printLineFeed(this.deviceId, this.serviceUuid, this.characteristicUuid);
    await this.printWriteData(this.deviceId, this.serviceUuid, this.characteristicUuid, `dan merupakan alat bukti`);
    await this.printLineFeed(this.deviceId, this.serviceUuid, this.characteristicUuid);
    await this.printWriteData(this.deviceId, this.serviceUuid, this.characteristicUuid, `pembayaran yang sah`);
    await this.printLineFeed(this.deviceId, this.serviceUuid, this.characteristicUuid);

    await this.printNewEmptyLine(this.deviceId, this.serviceUuid, this.characteristicUuid);
    await this.printNewEmptyLine(this.deviceId, this.serviceUuid, this.characteristicUuid);
    await this.printNewEmptyLine(this.deviceId, this.serviceUuid, this.characteristicUuid);
    await this.printNewEmptyLine(this.deviceId, this.serviceUuid, this.characteristicUuid);

    await this.bluetoothDisconnect(this.deviceId);
  }

  buttonSendReceipt() {
    let data = {
      number: this.whatsappNumber,
      trxId: this.paymentId
    }
    this.receiptService.send(data)
      .subscribe((response) => {
        if (response.status == 200) {
          console.log(response);
        }
      });
  }

  async buttonMaintenance() {
    const alert = await this.alertController.create({
      header: 'Perhatian',
      message: 'Fitur sedang dalam pengembangan.',
      buttons: ['Tutup'],
      mode: 'ios'
    });

    await alert.present();
  }

  formatNumber(value: number): string {
    return formatNumber(value, 'en-US');
  }

  formatNumberFromString(value: string): string {
    return formatNumber(parseInt(value), 'en-US');
  }

  buttonClose() {
    this.router.navigate(['/payment']);
  }

}
