import { Injectable, Type } from "@angular/core";
import { DataTargetType } from "@shared/enums/datatarget-type";
import { DatatargetDetail } from "./datatarget-detail/datatarget-detail";
import { DatatargetEdit } from "./datatarget-edit/datatarget-edit";
import { DatatargetTypeDescriptor } from "./datatarget.model";
import { FiwareDetailTabsComponent } from "./fiware/fiware-detail-tabs/fiware-detail-tabs.component";
import { FiwareEditComponent } from "./fiware/fiware-edit/fiware-edit.component";
import { HttppushDetailTabsComponent } from "./httppush/httppush-detail-tabs/httppush-detail-tabs.component";
import { HttppushEditComponent } from "./httppush/httppush-edit/httppush-edit.component";
import { MqttDetailTabsComponent } from "./mqtt/mqtt-detail-tabs/mqtt-detail-tabs.component";
import { MqttEditComponent } from "./mqtt/mqtt-edit/mqtt-edit.component";
import { OpendatadkEditComponent } from "./opendatadk/opendatadk-edit/opendatadk-edit.component";

@Injectable({
  providedIn: "root",
})
export class DatatargetTypesService {
  constructor() {}

  getAvailableDataTargetTypes(): DatatargetTypeDescriptor[] {
    return [
      {
        name: "DATATARGET.HTTP_PUSH.NAME",
        type: DataTargetType.HTTPPUSH,
        icon: null,
        description: "DATATARGET.HTTP_PUSH.DESCRIPTION",
        readMoreUrl: "",
        provider: "OS2",
      },
      {
        name: "DATATARGET.OPENDATA-DK.NAME",
        type: DataTargetType.OPENDATADK,
        icon: "/assets/images/logo_opendatadk.svg",
        description: "DATATARGET.OPENDATA-DK.DESCRIPTION",
        readMoreUrl: "https://www.opendata.dk/",
        provider: "OS2",
      },
      {
        name: "DATATARGET.FIWARE.NAME",
        type: DataTargetType.FIWARE,
        icon: "/assets/images/logo_FIWARE.png",
        description: "DATATARGET.FIWARE.DESCRIPTION",
        readMoreUrl: "https://www.kmd.dk",
        provider: "KMD A/S",
      },
      {
        name: "DATATARGET.MQTT.NAME",
        type: DataTargetType.MQTT,
        icon: "/assets/images/logo_mqtt.png",
        description: "DATATARGET.MQTT.DESCRIPTION",
        readMoreUrl: "https://mqtt.org/",
        provider: "OS2",
      },
    ];
  }

  getDetailComponent(dataTargetType: DataTargetType): Type<DatatargetDetail> {
    if (dataTargetType === DataTargetType.HTTPPUSH) {
      return HttppushDetailTabsComponent;
    }

    if (dataTargetType === DataTargetType.OPENDATADK) {
      return HttppushDetailTabsComponent;
    }

    if (dataTargetType === DataTargetType.FIWARE) {
      return FiwareDetailTabsComponent;
    }

    if (dataTargetType === DataTargetType.MQTT) {
      return MqttDetailTabsComponent;
    }
  }

  getEditComponent(dataTargetType: DataTargetType): Type<DatatargetEdit> {
    if (dataTargetType === DataTargetType.HTTPPUSH) {
      return HttppushEditComponent;
    }

    if (dataTargetType === DataTargetType.OPENDATADK) {
      return OpendatadkEditComponent;
    }

    if (dataTargetType === DataTargetType.FIWARE) {
      return FiwareEditComponent;
    }

    if (dataTargetType === DataTargetType.MQTT) {
      return MqttEditComponent;
    }
  }
}
