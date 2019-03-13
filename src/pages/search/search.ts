import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { TheSessionService } from "../../app/services/thesession.service";
import { Logger } from "../../utilities/Logger";
import { TunePage } from "../tune/tune";
import { RecordingPage } from "../recording/recording";
import { SessionPage } from "../session/session";
import { DiscussionPage } from "../discussion/discussion";
import { MemberPage } from "../member/member";

@Component({
    selector: 'page-search',
    templateUrl: 'search.html'
})

export class SearchPage {
    public searchQuery: string;
    public tunes: any;
    public recordings: any;
    public sessions: any;
    public events: any;
    public discussions: any;
    public members: any;

    private l: Logger;

    constructor(public navCtrl: NavController, private theSessionService: TheSessionService) {
        this.l = new Logger(true);
    }

    search(query) {
        this.theSessionService.search(query, 'tunes', 1).subscribe(res => {
            this.gatherPages(res, query, 'tunes', (e) => this.tunes = e);
        });
    }

    gatherMembers(query){
        this.theSessionService.search(query, 'members', 1).subscribe(res => {
            this.gatherPages(res, query, 'members', (e) => this.members = e);
        });
    }

    gatherRecordings(query) {
        this.theSessionService.search(query, 'recordings', 1).subscribe(res => {
            this.gatherPages(res, query, 'recordings', (e) => this.recordings = e);
        });
    }

    gatherSessions(query) {
        this.theSessionService.search(query, 'sessions', 1).subscribe(res => {
            this.gatherPages(res, query, 'sessions', (e) => this.sessions = e);
        });
    }

    gatherDiscussions(query) {
        this.theSessionService.search(query, 'discussions', 1).subscribe(res => {
            this.gatherPages(res, query, 'discussions', (e) => this.discussions = e);
        });
    }

    gatherPages(res, query, type, pointer) {
        var results = res[type];
        for (var i = 2; i <= 3; i++) {
            this.theSessionService.search(query, type, i).subscribe(res => {
                for (var i = 0; i < 10; i++) {
                    if (res[type][i] != undefined) {
                        results.push(res[type][i])
                    }
                }
            })
        }
        pointer(results);
    }

    goToDiscussion(discussionId) {
        this.navCtrl.push(DiscussionPage, {
            "DiscussionId": discussionId
        });
    }

    goToSession(sessionId) {
        this.navCtrl.push(SessionPage, {
            "SessionId": sessionId
        });
    }

    goToRecording(recordingId) {
        this.navCtrl.push(RecordingPage, {
            "RecordingId": recordingId
        });
    }

    goToMember(memberId) {
        this.navCtrl.push(MemberPage, {
            "MemberId": memberId
        });
    }

    goToTune(tuneId) {
        this.navCtrl.push(TunePage, {
            "TuneId": tuneId,
            "navCtrl": this.navCtrl,
            "theSessionService": this.theSessionService
        });
    }
}