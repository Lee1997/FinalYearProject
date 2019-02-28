import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TheSessionService } from '../../app/services/thesession.service';
import { Logger } from '../../utilities/Logger';
import { StringFormatter } from '../../utilities/StringFormatter';
import { EventPage } from '../event/event';


@Component({
    selector: 'page-events',
    templateUrl: 'events.html'
})

export class EventsPage {
    public newEvents : any;
    public upcomingEvents: any;

    private l : Logger;
    private strFormatter: StringFormatter;

    constructor(public navCtrl: NavController, private theSessionService: TheSessionService){
        this.l = new Logger();
        this.strFormatter = new StringFormatter();
        this.l.log("Creating Events Page")
    }

    ngOnInit(){
        this.getEvents();
    }

    getEvents(){
        this.getNewEvents();
        this.getUpcomingEvents();
    }

    getNewEvents(){
        this.theSessionService.getItems('new', 'events').subscribe(res => {
            this.strFormatter.formatEvents(res.events);
            this.newEvents = res.events;
        });
    }

    getUpcomingEvents(){
        this.theSessionService.getItems('upcoming', 'events').subscribe(res => {
            this.upcomingEvents = res.events;
        })
    }

    navigateToEvent(eventId){
        this.l.log("Navigating to tune id: " + eventId)
        this.navCtrl.push(EventPage, {
            "EventId": eventId,
            "navCtrl": this.navCtrl,
            "theSessionService": this.theSessionService
        });
    }
}