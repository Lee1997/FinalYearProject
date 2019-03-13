import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TheSessionService } from '../../app/services/thesession.service';
import { StringFormatter } from '../../utilities/StringFormatter';
import { Logger } from '../../utilities/Logger';
import { SessionPage } from '../session/session';


@Component({
    selector: 'page-sessions',
    templateUrl: 'sessions.html'
})

export class SessionsPage {
    public newSessions : any;
    private strFormatter : StringFormatter;
    private l : Logger;

    constructor(public navCtrl: NavController, private theSessionService: TheSessionService){
        this.l = new Logger();
        this.strFormatter = new StringFormatter();
        this.l.log("Creating Sessions Page");
    }

    ngOnInit(){
        this.getSessions();
    }

    getSessions(){
        this.getNewSessions();
    }

    getNewSessions(){
        this.theSessionService.getItems('new', 'sessions').subscribe(res => {
            this.newSessions = this.strFormatter.formatSessions(res.sessions);
        });
    }

    goToSession(session: any){
        this.l.log("Navigating to session id " + session.id);
        this.navCtrl.push(SessionPage, {
            "SessionId": session.id,
            "navCtrl": this.navCtrl,
            "theSessionService": this.theSessionService
        });
    }
}