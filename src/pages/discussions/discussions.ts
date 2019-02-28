import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TheSessionService } from '../../app/services/thesession.service';
import { Logger } from '../../utilities/Logger';
import { DiscussionPage } from '../discussion/discussion';


@Component({
    selector: 'page-discussions',
    templateUrl: 'discussions.html'
})

export class DiscussionsPage {
    public newDiscussions : any;
    public activeDiscussions : any;

    private l : Logger;

    constructor(public navCtrl: NavController, private theSessionService: TheSessionService){
        this.l = new Logger();
    }

    ngOnInit(){
        this.getDiscussions();
    }

    getDiscussions(){
        this.getNewDiscussions();
        this.getActiveDiscussions();
    }

    getNewDiscussions(){
        this.theSessionService.getItems('new', 'discussions').subscribe(res => {
            this.newDiscussions = res.discussions;
        });
    }

    getActiveDiscussions(){
        this.theSessionService.getItems('active', 'discussions').subscribe(res => {
            this.activeDiscussions = res.discussions;
        })
    }

    goToDiscussion(discussionId){
        this.l.log("Navigating to discsussion id: " + discussionId);
        this.navCtrl.push(DiscussionPage, {
            "DiscussionId": discussionId,
            "navCtrl": this.navCtrl,
            "theSessionService": this.theSessionService
        });
    }
}