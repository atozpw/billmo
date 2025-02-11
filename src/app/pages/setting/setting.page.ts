import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BleClient, BleService } from '@capacitor-community/bluetooth-le';
import { Preferences } from '@capacitor/preferences';
import { ToastController } from '@ionic/angular';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonLabel, IonList, IonItem } from '@ionic/angular/standalone';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
  standalone: true,
  imports: [IonLabel, IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonList, IonItem, IonMenuButton, CommonModule, FormsModule]
})
export class SettingPage implements OnInit {

  deviceId?: string;
  serviceUuid?: string;
  characteristicUuid?: string;

  constructor(private toastCtrl: ToastController) { }

  async ngOnInit() {
    await this.getDeviceId();
  }

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

  async bluetoothAssignServices() {
    const { value } = await Preferences.get({ key: 'bluetoothDeviceId' });
    let bleService: BleService[] = await BleClient.getServices(value || "");
    if (bleService.length > 0 && bleService[3].characteristics.length > 0) {
      Preferences.set({ key: 'bluetoothServiceUuid', value: bleService[3].uuid });
      Preferences.set({ key: 'bluetoothCharacteristicUuid', value: bleService[3].characteristics[0].uuid });
    }
  }

  async bluetoothScan() {
    await this.bluetoothVerifyAndEnabled();
    await this.bluetoothInit();
    let bleDevice = await BleClient.requestDevice({ allowDuplicates: false });
    if (bleDevice) {
      this.deviceId = bleDevice.deviceId;
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

  async getDeviceId() {
    const { value } = await Preferences.get({ key: 'bluetoothDeviceId' });
    this.deviceId = value || "Not Set";
  }

}
