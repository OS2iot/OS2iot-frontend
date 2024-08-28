import { Component, Input, OnInit } from "@angular/core";
import { AuthenticationType } from "@shared/enums/authentication-type";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { MqttSharedSettings } from "@shared/models/mqtt-shared-settings.model";

@Component({
    selector: "app-mqtt-authentication-select",
    templateUrl: "./mqtt-authentication-select.component.html",
    styleUrls: ["./mqtt-authentication-select.component.scss"],
})
export class MqttAuthenticationSelectComponent implements OnInit {
    @Input() settings: MqttSharedSettings;
    @Input() editMode: boolean = false;
    @Input() formFailedSubmit: boolean = false;
    @Input() errorFields: string[];

    constructor() {}

    ngOnInit(): void {}

    protected readonly AuthenticationType = AuthenticationType;
    protected readonly faQuestionCircle = faQuestionCircle;
}
