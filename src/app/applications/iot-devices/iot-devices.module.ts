import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormModule } from '@shared/components/forms/form.module';
import { TopBarModule } from '@shared/components/top-bar/top-bar.module';
import { NGMaterialModule } from '@shared/Modules/materiale.module';
import { DownlinkComponent } from './iot-device-detail/downlink/downlink.component';
import { IotDeviceDetailGenericComponent } from './iot-device-detail/iot-device-detail-generic/iot-device-detail-generic.component';
import { IotDeviceDetailLorawanComponent } from './iot-device-detail/iot-device-detail-lorawan/iot-device-detail-lorawan.component';
import { IotDeviceDetailSigfoxComponent } from './iot-device-detail/iot-device-detail-sigfox/iot-device-detail-sigfox.component';
import { IoTDeviceDetailComponent } from './iot-device-detail/iot-device-detail.component';
import { IotDeviceEditComponent } from './iot-device-edit/iot-device-edit.component';
import { SigfoxDeviceEditComponent } from './iot-device-edit/sigfox-device-edit/sigfox-device-edit.component';
import { IotDevicesTableRowComponent } from './iot-devices-table/iot-devices-table-row/iot-devices-table-row.component';
import { IotDevicesTableComponent } from './iot-devices-table/iot-devices-table.component';

@NgModule({
    declarations: [

        IotDevicesTableComponent,
        IotDevicesTableRowComponent,
        IoTDeviceDetailComponent,
        IotDeviceEditComponent,
        SigfoxDeviceEditComponent,
        IotDeviceDetailGenericComponent,
        IotDeviceDetailLorawanComponent,
        IotDeviceDetailSigfoxComponent,
        DownlinkComponent

    ],
    exports: [
        IotDevicesTableComponent,
        IoTDeviceDetailComponent
    ],
    imports: [
        CommonModule,
        TopBarModule,
        RouterModule,
        TranslateModule,
        FormModule,
        NGMaterialModule,
        FormsModule
    ],
})
export class IotDevicesModule { }
