import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BleClient, BleService, textToDataView, numberToUUID } from '@capacitor-community/bluetooth-le';
import { Preferences } from '@capacitor/preferences';
import { ToastController } from '@ionic/angular';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonButton
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonButton,
    CommonModule,
    FormsModule
  ]
})
export class HomePage implements OnInit {

  constructor(private toastCtrl: ToastController) { }

  async bluetoothInit() {
    await BleClient.initialize({ androidNeverForLocation: true });
  }

  async bluetoothConnect(deviceId: string) {
    await BleClient.connect(deviceId);
  }

  async bluetoothDisconnect(deviceId: string) {
    await BleClient.disconnect(deviceId);
  }

  async bluetoothVerifyAndEnabled() {
    if (!await BleClient.isEnabled()) {
      await BleClient.enable();
    }
  }

  async bluetoothScan() {
    await this.bluetoothVerifyAndEnabled();
    await this.bluetoothInit();
    let bleDevice = await BleClient.requestDevice({ allowDuplicates: false });
    if (bleDevice) {
      await BleClient.connect(bleDevice.deviceId, this.bluetoothDisconnect);
      const toast = await this.toastCtrl.create({
        message: 'Connected',
        duration: 3000,
        position: 'top'
      });
      await toast.present();
      Preferences.set({ key: 'bluetoothDeviceId', value: bleDevice.deviceId });
      await this.bluetoothAssignServices();
    }
  }

  async bluetoothAssignServices() {
    // const { value } = await Preferences.get({ key: 'bluetoothDeviceId' });
    let bleService: BleService[] = await BleClient.getServices("zWDdfuvycSRUq1FyTPQfNw==");
    // console.log(bleService);
    if (bleService.length > 0 && bleService[0].characteristics.length > 0) {
      console.log(bleService[0]);
      Preferences.set({ key: 'bluetoothServiceUuid', value: bleService[0].uuid });
      Preferences.set({ key: 'bluetoothCharacteristicUuid', value: bleService[0].characteristics[0].uuid });
    }
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
    await this.printLineFeed(deviceId, serviceUuid, characteristicUuid);
    await BleClient.write(deviceId, serviceUuid, characteristicUuid, textToDataView(text));
  }

  async printUnderLine(deviceId: string, serviceUuid: string, characteristicUuid: string) {
    await this.printLineFeed(deviceId, serviceUuid, characteristicUuid);
    await BleClient.write(deviceId, serviceUuid, characteristicUuid, textToDataView('-'.repeat(30)));
  }

  async printNewEmptyLine(deviceId: string, serviceUuid: string, characteristicUuid: string) {
    await this.printLineFeed(deviceId, serviceUuid, characteristicUuid);
    await BleClient.write(deviceId, serviceUuid, characteristicUuid, textToDataView(`${' '.repeat(18)}\n`));
  }

  ngOnInit() {
    this.bluetoothInit();
  }

  async buttonPrint() {
    const deviceId = "";
    const serviceUuid = "";
    const characteristicUuid = "";

    await this.bluetoothConnect(deviceId);

    await this.printTurnOnBold(deviceId, serviceUuid, characteristicUuid);
    await this.printFeedCenter(deviceId, serviceUuid, characteristicUuid);
    await this.printWriteData(deviceId, serviceUuid, characteristicUuid, "PERUMDAM TIRTA RAHARJA");
    await this.printUnderLine(deviceId, serviceUuid, characteristicUuid);
    await this.printTurnOffBold(deviceId, serviceUuid, characteristicUuid);

    await this.printFeedRight(deviceId, serviceUuid, characteristicUuid);
    await this.printWriteData(deviceId, serviceUuid, characteristicUuid, "currentDate");

    await this.printFeedLeft(deviceId, serviceUuid, characteristicUuid);
    await this.printWriteData(deviceId, serviceUuid, characteristicUuid, `Customer: Testing`);
    await this.printWriteData(deviceId, serviceUuid, characteristicUuid, `Item: Testing`);
    await this.printWriteData(deviceId, serviceUuid, characteristicUuid, `Qty: 1    Weight: 1`);
    await this.printWriteData(deviceId, serviceUuid, characteristicUuid, `Price: 1000   Amount: 1000`);

    await this.printNewEmptyLine(deviceId, serviceUuid, characteristicUuid);

    await this.printFeedCenter(deviceId, serviceUuid, characteristicUuid);
    await this.printWriteData(deviceId, serviceUuid, characteristicUuid, "Please Collect after one hour.");
    await this.printWriteData(deviceId, serviceUuid, characteristicUuid, "---Thank you---");
    await this.printFeedLeft(deviceId, serviceUuid, characteristicUuid);

    await this.printNewEmptyLine(deviceId, serviceUuid, characteristicUuid);

    await this.bluetoothDisconnect(deviceId);
  }

}
