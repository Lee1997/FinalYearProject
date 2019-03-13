import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TheSessionService } from '../../app/services/thesession.service';
import { StringFormatter } from '../../utilities/StringFormatter';
import { AbcFormatter } from '../../utilities/AbcFormatter';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Logger } from '../../utilities/Logger';
import { MemberPage } from '../member/member';

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

    constructor(navParam : NavParams, public navCtrl: NavController, private theSessionService: TheSessionService, private nativeStorage: NativeStorage){
        this.l = new Logger();
        this.strFormatter = new StringFormatter();
        this.discussionId = navParam.get("DiscussionId");
        this.getInformation(this.discussionId);
    }

    getInformation(discussionId){
        this.theSessionService.getInformation("discussions", discussionId).subscribe( res => {
            this.name = this.strFormatter.format(res.name);
            this.comments = this.strFormatter.cleanComments(res.comments);
        })
    }

    goToMember(memberId){
        this.l.log("Navigating to Member id: " + memberId);
        this.navCtrl.push(MemberPage, {
            "MemberId": memberId
        });
    }
}