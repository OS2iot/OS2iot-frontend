import { AuthenticationType } from "@shared/enums/authentication-type";

export class MqttSharedSettings {
    mqttURL: string;
    mqttPort: number;
    mqtttopicname: string;
    authenticationType: AuthenticationType;
    caCertificate: string;
    deviceCertificate: string;
    deviceCertificateKey: string;
    mqttusername: string;
    mqttpassword: string;
}
