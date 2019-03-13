import { Component } from "@angular/core";
import { NavParams, NavController } from "ionic-angular";
import { TheSessionService } from "../../app/services/thesession.service";
import { Logger } from "../../utilities/Logger";
import { StringFormatter } from "../../utilities/StringFormatter";
import { TunePage } from "../tune/tune";
import { DiscussionPage } from "../discussion/discussion";
import { NativeStorage } from "@ionic-native/native-storage/ngx";
import { ReferenceStrings } from "../../utilities/ReferenceStrings";


@Component({
    selector: 'page-member',
    templateUrl: 'member.html'
})

export class MemberPage{
    public name : String;
    public bio : String;
    public tunebooksCount: Number;
    public tunebookTunes: any;
    public tripsCount: Number;
    public setsCount: Number;
    public settingsCount: Number;
    public settings: any;
    public recordingsCount: Number;
    public sessionsCount: Number;
    public eventsCount: Number;
    public discussionsCount: Number;
    public discussions: any;
    public commentsCount: Number;

    private l : Logger;
    private strFormatter: StringFormatter;
    private memberId : Number;

    constructor(navParam: NavParams, public navCtrl: NavController, private theSessionService : TheSessionService, private nativeStorage: NativeStorage){
        this.l = new Logger(true);
        this.strFormatter = new StringFormatter();
        this.memberId = navParam.get("MemberId");
        this.getInformation(this.memberId);
    }

    ionViewCanEnter(){
    }

    getInformation(memberId){
        this.theSessionService.getInformation("members", this.memberId).subscribe(res => {
            this.name = res.name;
            this.bio = this.strFormatter.format(res.bio);
            this.tunebooksCount = parseInt(res.tunebook);
            this.tripsCount = parseInt(res.trips);
            this.setsCount = parseInt(res.sets),
            this.settingsCount = parseInt(res.settings),
            this.recordingsCount = parseInt(res.recordings),
            this.sessionsCount = parseInt(res.sessions),
            this.eventsCount = parseInt(res.events),
            this.discussionsCount = parseInt(res.discussions),
            this.commentsCount = parseInt(res.comments)
        });
        this.theSessionService.getTunebookInformation(memberId).subscribe(res => {
            this.name = res.member.name;
            this.tunebookTunes = this.strFormatter.formatNames(res.tunes);
        });
        this.theSessionService.getMemberInformation("tunes", memberId).subscribe(res => {
            this.settings = this.strFormatter.formatTuneSettings(res.settings);
        });
        this.theSessionService.getMemberInformation("discussions", memberId).subscribe(res => {
            this.discussions = this.strFormatter.formatNames(res.discussions);
        })

    }
    goToTune(tuneId){
        this.navCtrl.push(TunePage, {
            "TuneId": tuneId
        })
    }

    goToTunebook(memberId){
        this.navCtrl.push(MemberPage, {
            "MemberId": memberId
        });
    }

    goToDiscussion(discussionId){
        this.navCtrl.push(DiscussionPage, {
            "DiscussionId": discussionId
        });
    }

    saveTunebook(memberId){
        this.nativeStorage.getItem(ReferenceStrings.SavedUsers).then(
            data => {
                var currentSaved = data;
                currentSaved.push({"memberId": memberId, "name": this.name});

                this.nativeStorage.setItem(ReferenceStrings.SavedUsers, currentSaved);
                alert("Saved Tunebook!")
            },
            error => {
                // If there are no previous saved tunebooks add the first
                this.nativeStorage.setItem(ReferenceStrings.SavedUsers, new Array({"memberId": memberId, "name": this.name}));
                alert("Saved First Tune!");
            }
        )

    }
}