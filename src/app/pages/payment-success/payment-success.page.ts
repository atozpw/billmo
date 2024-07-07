import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BleClient, BleService, textToDataView } from '@capacitor-community/bluetooth-le';
import { Preferences } from '@capacitor/preferences';
import { ToastController } from '@ionic/angular';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCard, IonCardContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.page.html',
  styleUrls: ['./payment-success.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCard, IonCardContent, CommonModule, FormsModule]
})
export class PaymentSuccessPage implements OnInit {

  deviceId: string = '';
  serviceUuid: string = '';
  characteristicUuid: string = '';

  constructor(private router: Router) { }

  async ngOnInit() {
    await this.getDeviceId();
    await this.getServiceUuid();
    await this.getCharacteristicUuid();
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

    // header
    await this.printTurnOnBold(this.deviceId, this.serviceUuid, this.characteristicUuid);
    await this.printFeedCenter(this.deviceId, this.serviceUuid, this.characteristicUuid);
    await this.printWriteData(this.deviceId, this.serviceUuid, this.characteristicUuid, "PERUMDAM TIRTA RAHARJA");
    await this.printLineFeed(this.deviceId, this.serviceUuid, this.characteristicUuid);
    await this.printFeedLeft(this.deviceId, this.serviceUuid, this.characteristicUuid);
    await this.printUnderLine(this.deviceId, this.serviceUuid, this.characteristicUuid);
    await this.printTurnOffBold(this.deviceId, this.serviceUuid, this.characteristicUuid);
    await this.printLineFeed(this.deviceId, this.serviceUuid, this.characteristicUuid);

    // content
    await this.printFeedLeft(this.deviceId, this.serviceUuid, this.characteristicUuid);
    await this.printWriteData(this.deviceId, this.serviceUuid, this.characteristicUuid, `No. Trx  : 1234567890123456`);
    await this.printLineFeed(this.deviceId, this.serviceUuid, this.characteristicUuid);
    await this.printWriteData(this.deviceId, this.serviceUuid, this.characteristicUuid, `Waktu    : 2024-06-27 09:19:00`);
    await this.printLineFeed(this.deviceId, this.serviceUuid, this.characteristicUuid);
    await this.printWriteData(this.deviceId, this.serviceUuid, this.characteristicUuid, `Kasir    : Administrator`);
    await this.printLineFeed(this.deviceId, this.serviceUuid, this.characteristicUuid);
    await this.printLineFeed(this.deviceId, this.serviceUuid, this.characteristicUuid);
    await this.printWriteData(this.deviceId, this.serviceUuid, this.characteristicUuid, `No. SR   : 000001`);
    await this.printLineFeed(this.deviceId, this.serviceUuid, this.characteristicUuid);
    await this.printWriteData(this.deviceId, this.serviceUuid, this.characteristicUuid, `Nama     : ITA WIJAYA`);
    await this.printLineFeed(this.deviceId, this.serviceUuid, this.characteristicUuid);
    await this.printWriteData(this.deviceId, this.serviceUuid, this.characteristicUuid, `Alamat   : POJOK NO.75 / 643`);
    await this.printLineFeed(this.deviceId, this.serviceUuid, this.characteristicUuid);
    await this.printWriteData(this.deviceId, this.serviceUuid, this.characteristicUuid, `Golongan : 2R1`);
    await this.printLineFeed(this.deviceId, this.serviceUuid, this.characteristicUuid);
    await this.printUnderLine(this.deviceId, this.serviceUuid, this.characteristicUuid);
    await this.printLineFeed(this.deviceId, this.serviceUuid, this.characteristicUuid);
    await this.printWriteData(this.deviceId, this.serviceUuid, this.characteristicUuid, `Rekening Mei 2024`);
    await this.printLineFeed(this.deviceId, this.serviceUuid, this.characteristicUuid);
    await this.printWriteData(this.deviceId, this.serviceUuid, this.characteristicUuid, `Uang Air     : 100.000`);
    await this.printLineFeed(this.deviceId, this.serviceUuid, this.characteristicUuid);
    await this.printWriteData(this.deviceId, this.serviceUuid, this.characteristicUuid, `Beban Tetap  : 20.000`);
    await this.printLineFeed(this.deviceId, this.serviceUuid, this.characteristicUuid);
    await this.printWriteData(this.deviceId, this.serviceUuid, this.characteristicUuid, `Denda        : 5.000`);
    await this.printLineFeed(this.deviceId, this.serviceUuid, this.characteristicUuid);
    await this.printWriteData(this.deviceId, this.serviceUuid, this.characteristicUuid, `Materai      : 0`);
    await this.printLineFeed(this.deviceId, this.serviceUuid, this.characteristicUuid);
    await this.printWriteData(this.deviceId, this.serviceUuid, this.characteristicUuid, `Total        : 125.000`);
    await this.printLineFeed(this.deviceId, this.serviceUuid, this.characteristicUuid);
    await this.printLineFeed(this.deviceId, this.serviceUuid, this.characteristicUuid);
    await this.printWriteData(this.deviceId, this.serviceUuid, this.characteristicUuid, `Rekening Juni 2024`);
    await this.printLineFeed(this.deviceId, this.serviceUuid, this.characteristicUuid);
    await this.printWriteData(this.deviceId, this.serviceUuid, this.characteristicUuid, `Uang Air     : 100.000`);
    await this.printLineFeed(this.deviceId, this.serviceUuid, this.characteristicUuid);
    await this.printWriteData(this.deviceId, this.serviceUuid, this.characteristicUuid, `Beban Tetap  : 20.000`);
    await this.printLineFeed(this.deviceId, this.serviceUuid, this.characteristicUuid);
    await this.printWriteData(this.deviceId, this.serviceUuid, this.characteristicUuid, `Denda        : 0`);
    await this.printLineFeed(this.deviceId, this.serviceUuid, this.characteristicUuid);
    await this.printWriteData(this.deviceId, this.serviceUuid, this.characteristicUuid, `Materai      : 0`);
    await this.printLineFeed(this.deviceId, this.serviceUuid, this.characteristicUuid);
    await this.printWriteData(this.deviceId, this.serviceUuid, this.characteristicUuid, `Total        : 120.000`);
    await this.printLineFeed(this.deviceId, this.serviceUuid, this.characteristicUuid);
    await this.printUnderLine(this.deviceId, this.serviceUuid, this.characteristicUuid);
    await this.printLineFeed(this.deviceId, this.serviceUuid, this.characteristicUuid);
    await this.printWriteData(this.deviceId, this.serviceUuid, this.characteristicUuid, `Grand Total  : 245.000`);
    await this.printLineFeed(this.deviceId, this.serviceUuid, this.characteristicUuid);
    await this.printNewEmptyLine(this.deviceId, this.serviceUuid, this.characteristicUuid);
    await this.printLineFeed(this.deviceId, this.serviceUuid, this.characteristicUuid);
    await this.printTurnOnBold(this.deviceId, this.serviceUuid, this.characteristicUuid);
    await this.printWriteData(this.deviceId, this.serviceUuid, this.characteristicUuid, `#AYOBAYARONLINE`);
    await this.printTurnOffBold(this.deviceId, this.serviceUuid, this.characteristicUuid);
    await this.printLineFeed(this.deviceId, this.serviceUuid, this.characteristicUuid);

    await this.printNewEmptyLine(this.deviceId, this.serviceUuid, this.characteristicUuid);
    await this.printNewEmptyLine(this.deviceId, this.serviceUuid, this.characteristicUuid);
    await this.printNewEmptyLine(this.deviceId, this.serviceUuid, this.characteristicUuid);

    await this.bluetoothDisconnect(this.deviceId);
  }

  buttonSendReceipt() {

  }

  buttonClose() {
    this.router.navigate(['/payment']);
  }

}
