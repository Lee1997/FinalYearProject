import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TheSessionService } from '../../app/services/thesession.service';
import { Chart } from 'chart.js';

@Component({
    selector: 'page-statistics',
    templateUrl: 'statistics.html'
})

export class StatisticsPage {

    public types: Array<any> = [];
    public typesLabels: Array<any> = [];
    public modes: Array<any> = [];
    public modesLabels: Array<any> = [];
    public meters: Array<any> = [];
    public metersLabels: Array<any> = [];
    public chart_colors: Array<any> = [];

    @ViewChild('typesChart') typeChartRef: ElementRef;
    public typeChart: Chart;
    @ViewChild('modesChart') modeChartRef: ElementRef;
    public modeChart: Chart;
    @ViewChild('metersChart') meterChartRef: ElementRef;
    public meterChart: Chart;

    constructor(public navCtrl: NavController, private theSessionService: TheSessionService) {
        this.fillDataFromFile();
        this.chart_colors = this.fillColorsData()
    }

    fillDataFromFile() {
        let json = require('../../utilities/chart-data/data.json');
        var types = json["types"];
        var typeKeys = Object.keys(types);
        for (var i = 0; i < typeKeys.length; i++) {
            this.typesLabels.push(typeKeys[i]);
            this.types.push(types[typeKeys[i]]);
        }

        var modes = json["modes"];
        var modeKeys = Object.keys(modes);
        for (var i = 0; i < modeKeys.length; i++) {
            this.modesLabels.push(modeKeys[i]);
            this.modes.push(modes[modeKeys[i]]);
        }

        var meters = json["meters"]
        var meterKeys = Object.keys(meters);
        for (var i = 0; i < meterKeys.length; i++) {
            this.metersLabels.push(meterKeys[i]);
            this.meters.push(meters[meterKeys[i]]);
        }

    }

    ngAfterContentInit() {
        this.renderCharts();
    }

    // Chart JS version
    renderCharts() {
        this.typeChart = new Chart(this.typeChartRef.nativeElement.getContext('2d'), {
            type: 'pie',
            data: {
                labels: this.typesLabels,
                datasets: [
                    {
                        backgroundColor: this.chart_colors,
                        data: this.types,
                        borderColor: '#000000'
                    }
                ]
            },
            options: {
                legend: {
                    labels: {
                        generateLabels: (chart) => this.generateLabels(chart)
                    }
                }
            }
        });
        this.modeChart = new Chart(this.modeChartRef.nativeElement.getContext('2d'), {
            type: 'line',
            data: {
                labels: this.modesLabels,
                datasets: [
                    {
                        backgroundColor: this.chart_colors,
                        data: this.modes,
                        borderColor: "#000000"
                    }
                ]
            },
            options: {
                legend: {
                    labels: {
                        generateLabels: (chart) => this.generateLabels(chart)
                    }
                }
            }
        });

        this.meterChart = new Chart(this.meterChartRef.nativeElement.getContext('2d'), {
            type: "pie",
            data: {
                labels: this.metersLabels,
                datasets: [
                    {
                        backgroundColor: this.chart_colors,
                        data: this.meters,
                        borderColor: '#000000'
                    }
                ]
            },
            options: {
                legend: {
                    labels: {
                        generateLabels: (chart) => this.generateLabels(chart)
                    }
                }
            }
        });

    }
    
    generateLabels(chart){
            var data = chart.data;
            if (data.labels.length && data.datasets.length) {
                return data.labels.map(function(label, i) {
                    var meta = chart.getDatasetMeta(0);
                    var ds = data.datasets[0];
                    var arc = meta.data[i];
                    var custom = arc && arc.custom || {};
                    var getValueAtIndexOrDefault = Chart.helpers.getValueAtIndexOrDefault;
                    var arcOpts = chart.options.elements.arc;
                    var fill = custom.backgroundColor ? custom.backgroundColor : getValueAtIndexOrDefault(ds.backgroundColor, i, arcOpts.backgroundColor);
                    var stroke = custom.borderColor ? custom.borderColor : getValueAtIndexOrDefault(ds.borderColor, i, arcOpts.borderColor);
                    var bw = custom.borderWidth ? custom.borderWidth : getValueAtIndexOrDefault(ds.borderWidth, i, arcOpts.borderWidth);

                    // We get the value of the current label
                    var value = chart.config.data.datasets[arc._datasetIndex].data[arc._index];

                    return {
                        // Instead of `text: label,`
                        // We add the value to the string
                        text: label + " : " + value,
                        fillStyle: fill,
                        strokeStyle: stroke,
                        lineWidth: bw,
                        hidden: isNaN(ds.data[i]) || meta.data[i].hidden,
                        index: i
                    };
                });
            } else {
                return [];
            }
    }

    fillColorsData() {
        return [
            "#800000",
            "#9A6324",
            "#ffe119",
            "#3cb44b",
            "#aaffc3",
            "#e6beff",
            "#ffffff",
            "#000075",
            "#bfef45",
            "#000000",
            "#f032e6",
            "#abcd45",
            "#cde987",
            "#22aaaa",
            "#aa2222",
            "#cccccc",
            "#51aa33",
            "#666fff",
            "#111111",
            "#444ddd",
            "#bff999",
            "#00ffff"
        ];
    }
}