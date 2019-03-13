import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TheSessionService } from '../../app/services/thesession.service';
import { StringFormatter } from '../../utilities/StringFormatter';
import { Logger } from '../../utilities/Logger';
import { TunePage } from '../tune/tune';

@Component({
    selector: 'page-event',
    templateUrl: 'event.html'
})

export class EventPage{

    public name : string;
    public dateStart : string;
    public dateEnd : string;
    public memberName : string;
    public postDate : string;
    public address : string;

    private strFormatter : StringFormatter;
    private l : Logger = new Logger();

    constructor(navParam: NavParams, public navCtrl: NavController, private theSessionService: TheSessionService){
        this.l = new Logger();
        this.strFormatter = new StringFormatter();
        let eventId = navParam.get("EventId");
        this.getInformation(eventId);
    }

    getInformation(eventId){
        this.l.log("Getting event information for event id: " + eventId);
        this.theSessionService.getInformation("events", eventId).subscribe(res => {
            res = this.strFormatter.formatEvent(res);
            this.name = res.name;
            this.dateStart = res.dtstart;
            this.dateEnd = res.dtend;
            this.memberName = res.member.name;
            this.postDate = res.date;
            this.address = this.strFormatter.formatEventAddress(res);
        });
    }

}