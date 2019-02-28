import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TheSessionService } from '../../app/services/thesession.service';
import { Logger } from '../../utilities/Logger';
import { RecordingPage } from '../recording/recording';
import { StringFormatter } from '../../utilities/StringFormatter';


@Component({
    selector: 'page-recordings',
    templateUrl: 'recordings.html'
})

export class RecordingsPage {
    public newRecordings : any;
    private l : Logger = new Logger();
    private strFormatter : StringFormatter;
    constructor(public navCtrl: NavController, private theSessionService: TheSessionService){
        this.strFormatter = new StringFormatter();
    }

    ngOnInit(){
        this.getRecordings();
    }

    getRecordings(){
        this.getNewRecordings();
    }

    getNewRecordings(){
        this.theSessionService.getItems('new', 'recordings').subscribe(res => {
            this.newRecordings = this.strFormatter.formatRecordings(res.recordings);
        });
    }

    goToRecording(recording: any){
        this.l.log("Navigating to discussion " + recording.id)
        this.navCtrl.push(RecordingPage, {
            "RecordingId": recording.id,
            "navCtrl": this.navCtrl,
            "theSessionService": this.theSessionService
        });
    }
}