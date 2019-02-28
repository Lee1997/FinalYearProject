import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TheSessionService } from '../../app/services/thesession.service';
import { StringFormatter } from '../../utilities/StringFormatter';
import { Logger } from '../../utilities/Logger';
import { TunePage } from '../tune/tune';


@Component({
    selector: 'page-recording',
    templateUrl: 'recording.html'
})

export class RecordingPage{
    public recordingName : string;
    public recordingArtistName : string;
    public recordingArtistUrl: string;
    public tracks: JSON;

    private l : Logger = new Logger();
    private strFormatter : StringFormatter;

    constructor(navParam: NavParams, public navCtrl: NavController, private theSessionService : TheSessionService){
        let recordingId = navParam.get("RecordingId");
        this.getInformation(recordingId);
        this.strFormatter = new StringFormatter();
    }

    getInformation(recordingId){
        this.l.log("Getting recording information for recording id: " + recordingId);
        this.theSessionService.getInformation("recordings", recordingId).subscribe(res => {
            this.recordingName = this.strFormatter.format(res.name);
            this.recordingArtistName = this.strFormatter.format(res.artist.name);
            this.recordingArtistUrl = res.artist.url;
            this.tracks = this.strFormatter.formatTracks(res.tracks);
        });
    }

    navigateToTune(tuneId){
        if(tuneId == undefined)
            return;

        this.l.log("Navigating to tune id: " + tuneId)
        this.navCtrl.push(TunePage, {
            "TuneId": tuneId,
            "navCtrl": this.navCtrl,
            "theSessionService": this.theSessionService
        })
    }

    idIsDefined(id){
        return id != undefined;
    }

    ngOnInit(){}
}