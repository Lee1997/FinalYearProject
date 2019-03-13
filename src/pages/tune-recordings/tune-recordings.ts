import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { TheSessionService } from "../../app/services/thesession.service";
import { StringFormatter } from "../../utilities/StringFormatter";
import { RecordingPage } from "../recording/recording";

@Component({
    selector: 'page-tune-recordings',
    templateUrl: 'tune-recordings.html'
})

export class TuneRecordingsPage{
    public tuneId: string;
    public recordings: any;
    public recordedWith: any;
    public name : string;

    private strFormatter : StringFormatter;

    constructor(navParam: NavParams, public navCtrl: NavController, private theSessionService: TheSessionService){
        this.strFormatter = new StringFormatter();

        this.tuneId = navParam.get("TuneId");
        this.getInformation(this.tuneId);
    }

    getInformation(tuneId){
        this.theSessionService.getTuneRecordings(tuneId).subscribe(res => {
            this.name = this.strFormatter.format(res.name);
            this.recordings = res.recordings;
            this.recordedWith = res.recorded_with;
        });
    }

    goToRecording(recordingId){
        this.navCtrl.push(RecordingPage, {
            "RecordingId": recordingId
        })
    }
}