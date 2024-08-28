import { Component, OnInit } from "@angular/core";
import { IotDeviceDetailsService } from "@applications/iot-devices/iot-device-details-service";
import { IotDevice } from "@applications/iot-devices/iot-device.model";
import { DeviceType } from "@shared/enums/device-type";
import { ChartConfiguration } from "chart.js";
import moment from "moment/moment";
import { ColorGraphBlue1 } from "@shared/constants/color-constants";
import { recordToEntries } from "@shared/helpers/record.helper";
import { IoTDeviceService } from "@applications/iot-devices/iot-device.service";

/**
 * Ordered from "worst" to "best" (from DR0 and up)
 */
const dataRateColors = ["#F57A2F", "#FFA620", "#F6CE06", "#FFEB3B", "#CDDC39", "#93E528", "#72D144", "#56B257"];

@Component({
    selector: "app-iot-device-history-tab",
    templateUrl: "./iot-device-history-tab.component.html",
    styleUrls: ["./iot-device-history-tab.component.scss"],
})
export class IotDeviceHistoryTabComponent implements OnInit {
    device: IotDevice;
    dataRateChartData: ChartConfiguration["data"] = { datasets: [] };
    rssiChartData: ChartConfiguration["data"] = { datasets: [] };
    snrChartData: ChartConfiguration["data"] = { datasets: [] };

    dataRateChartOptions: ChartConfiguration["options"] = {
        scales: {
            x: { stacked: true },
            y: { stacked: true },
        },
        plugins: {
            tooltip: {
                mode: "index",
                position: "average",
            },
        },
    };
    constructor(private iotDeviceDetailsService: IotDeviceDetailsService, private iotDeviceService: IoTDeviceService) {}

    ngOnInit(): void {
        this.device = this.iotDeviceDetailsService.device;
        this.getDeviceStats();
    }

    private getDeviceStats(): void {
        if (this.device?.type !== DeviceType.LORAWAN && this.device?.type !== DeviceType.SIGFOX) {
            return;
        }

        this.iotDeviceService.getDeviceStats(this.device.id).subscribe(
            response => {
                if (!response) {
                    return;
                }

                const { rssiDatasets, snrDatasets, dataRateDatasets, labels } = response.reduce(
                    (
                        res: {
                            rssiDatasets: ChartConfiguration["data"]["datasets"];
                            snrDatasets: ChartConfiguration["data"]["datasets"];
                            dataRateDatasets: ChartConfiguration["data"]["datasets"];
                            labels: ChartConfiguration["data"]["labels"];
                        },
                        data
                    ) => {
                        // Hide zero-values with null
                        res.rssiDatasets[0].data.push(data.rssi || null);
                        res.snrDatasets[0].data.push(data.snr || null);
                        this.addDataRate(res.dataRateDatasets, data.rxPacketsPerDr);

                        res.labels.push(moment(data.timestamp).format("MMM D"));
                        return res;
                    },
                    {
                        rssiDatasets: [
                            {
                                data: [],
                                borderColor: ColorGraphBlue1,
                                backgroundColor: ColorGraphBlue1,
                            },
                        ],
                        snrDatasets: [
                            {
                                data: [],
                                borderColor: ColorGraphBlue1,
                                backgroundColor: ColorGraphBlue1,
                            },
                        ],
                        dataRateDatasets: this.initDataRates(),
                        labels: [],
                    }
                );

                // Cleanup before saving
                this.removeEmptyDatasets(dataRateDatasets);

                this.rssiChartData = { datasets: rssiDatasets, labels };
                this.snrChartData = { datasets: snrDatasets, labels };
                this.dataRateChartData = { datasets: dataRateDatasets, labels };
            },
            _error => {}
        );
    }

    private initDataRates(): ChartConfiguration["data"]["datasets"] {
        return dataRateColors.map((color, i) => ({
            data: [],
            label: i.toString(),
            borderColor: color,
            backgroundColor: color,
        }));
    }

    private addDataRate(
        datasets: ChartConfiguration["data"]["datasets"],
        dataRate: Record<number, number> | undefined
    ) {
        if (!dataRate) {
            return;
        }

        const dataRateList = recordToEntries(dataRate, false);
        datasets.forEach(dataset => {
            if (!dataRateList.length) {
                dataset.data.push(0);
                return;
            }

            const match = dataRateList.find(record => record.key.toString() === dataset.label);
            match ? dataset.data.push(match.value) : dataset.data.push(0);
        });
    }

    private removeEmptyDatasets(datasets: ChartConfiguration["data"]["datasets"]): void {
        for (let i = datasets.length - 1; i >= 0; i--) {
            const dataset = datasets[i];
            if (!dataset.data.some(point => point !== 0)) {
                datasets.splice(i, 1);
            }
        }
    }
}
