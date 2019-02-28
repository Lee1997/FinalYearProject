import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TheSessionService } from '../../app/services/thesession.service';
import { StringFormatter } from '../../utilities/StringFormatter';
import { Logger } from '../../utilities/Logger';

@Component({
    selector: 'page-discussion',
    templateUrl: 'discussion.html'
})

export class DiscussionPage {
    public name : string;
    public comments : JSON;

    private discussionId : number;
    private l : Logger;
    private strFormatter : StringFormatter;

    constructor(navParam : NavParams, public navCtrl: NavController, private theSessionService: TheSessionService){
        this.l = new Logger();
        this.strFormatter = new StringFormatter();
        this.discussionId = navParam.get("DiscussionId");
        this.getInformation(this.discussionId);
    }

    getInformation(discussionId){
        this.l.log("Getting discussion information for is: " + discussionId);
        this.theSessionService.getInformation("discussions", discussionId).subscribe( res => {
            this.name = this.strFormatter.format(res.name);
            this.comments = this.strFormatter.cleanComments(res.comments);
        })
    }
}