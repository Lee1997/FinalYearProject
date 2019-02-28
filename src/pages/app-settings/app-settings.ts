import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Logger } from '../../utilities/Logger';

@Component({
    selector: 'page-app-settings',
    templateUrl: 'app-settings.html'
})

export class AppSettingsPage {

    public zoom: String;
    private _zoom: number;
    readonly ZOOM_STEP = 0.1;
    readonly ZOOM_SCALE = 10;
    private l: Logger = new Logger();

    constructor(navParam: NavParams, public navCtrl: NavController, private nativeStorage: NativeStorage) {
        this.nativeStorage.getItem('defaultTuneNotationZoom')
            .then(
                data => {
                    this._zoom = data.zoom; this.calculateDisplayZoom()
                },
                error => {
                    this.l.logError("Error loading zoom: ", error); this._zoom = 0.7;
                    this.calculateDisplayZoom();
                });
    }

    increaseZoom() {
        this._zoom += this.ZOOM_STEP;
        this.calculateDisplayZoom();
    }

    decreaseZoom() {
        this._zoom -= this.ZOOM_STEP;
        this.calculateDisplayZoom();
    }

    calculateDisplayZoom() {
        this._zoom = Number.parseFloat(new Number(this._zoom).toFixed(1));

        this.zoom = this._zoom + "";
    }

    save() {
        this.nativeStorage.setItem("defaultTuneNotationZoom", { zoom: this.zoom });
    }
}