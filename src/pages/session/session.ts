import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TheSessionService } from '../../app/services/thesession.service';
import { StringFormatter } from '../../utilities/StringFormatter';
import { Logger } from '../../utilities/Logger';

@Component({
    selector: 'page-session',
    templateUrl: 'session.html'
})

export class SessionPage{
    public name : string;
    public location : string;
    public memberName : string;
    public date : string;
    public schedule : string;
    public website : string;
    public telephone : string;
    public comments : JSON;
    public location_lat: string;
    public location_long: string;
    private l : Logger;
    private strFormatter: StringFormatter;

    constructor(navParam: NavParams, public navCtrl: NavController, private theSessionService: TheSessionService){
        this.l = new Logger();
        this.strFormatter = new StringFormatter();
        let sessionId = navParam.get("SessionId");
        this.l.log("Session page recieved id: " + sessionId);
        this.getInformation(sessionId);
    }

    getInformation(sessionId){
        this.l.log("Getting session information for session id: " + sessionId)
        this.theSessionService.getInformation("sessions", sessionId).subscribe(res => {
            res = this.strFormatter.formatSession(res);
            this.name = res.venue.name
            this.location = this.strFormatter.formatSessionLocation(res);
            this.memberName = this.strFormatter.format(res.member.name);
            this.date = res.date;
            this.schedule = res.schedule;
            this.website = res.venue.web;
            this.comments = this.strFormatter.formatComments(res.comments);
            this.telephone = this.strFormatter.formatTelephoneLink(res.venue.telephone);
            this.location_lat = res.latitude;
            this.location_long = res.longitude;
        });
    }

    getMapsLink(){
        return "https://www.google.es/maps/dir/'"
         + this.location_lat + "," + this.location_long 
         + "'";
    }

}