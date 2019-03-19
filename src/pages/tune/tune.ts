import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TheSessionService } from '../../app/services/thesession.service';
import { StringFormatter } from '../../utilities/StringFormatter';
import { AbcFormatter } from '../../utilities/AbcFormatter';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Logger } from '../../utilities/Logger';
import abcjs from "abcjs";
import { AbcStringComparer } from '../../utilities/AbcStringComparer';
import { MemberPage } from '../member/member'
import { TuneRecordingsPage } from '../tune-recordings/tune-recordings';


@Component({
    selector: 'page-tune',
    templateUrl: 'tune.html'
})

export class TunePage {
    public name: string;
    public member: string;
    public memberId: string;
    public date: string;
    public type: string;
    public tuneBookCount: string;
    public recordingCount: string;
    public settings: any;
    public multipleSettings: boolean;
    public comments: JSON;
    public aliases: any;
    public leftOptions: string[];
    private leftSettingCompare: number;
    private rigthSettingCompare: number;
    private settingZoom: number;
    public rightOptions: string[];

    private tuneId: string;
    private abcFormatter: AbcFormatter;
    private strFormatter: StringFormatter;
    private l: Logger;
    private comparer: AbcStringComparer;

    public callFun: Function;

    constructor(navParam: NavParams, public navCtrl: NavController, private theSessionService: TheSessionService, private nativeStorage: NativeStorage) {
        this.l = new Logger();
        this.comparer = new AbcStringComparer();
        this.tuneId = navParam.get('TuneId');
        this.abcFormatter = new AbcFormatter();
        this.strFormatter = new StringFormatter();
    }

    ionViewCanEnter() {
        this.getInformation();
    }

    ngOnInit() {
    }

    renderNotes(settingIndex) {
        var abc = document.getElementById('abc' + settingIndex).innerText;
        var notationId = 'notation' + settingIndex;

        abc = this.formatAbc(abc);
        abcjs.renderAbc(notationId, abc);

        document.getElementById('notationButton' + settingIndex).style.display = "none";
        var ctrlbox = document.getElementById('settingControlsBox' + settingIndex);
        ctrlbox.style.display = "flex"
        ctrlbox.style.justifyContent = "center"

        var x = document.getElementById('notation' + settingIndex);
        x.style.overflowX = "scroll";

        this.settingZoom = 0.7;
        this.setZoom(this.settingZoom);
    }

    selectionCallback(abcelem) {
        var note = {};
        for (var key in abcelem) {
            if (abcelem.hasOwnProperty(key) && key !== "abselem")
                note[key] = abcelem[key];
        }
       this.l.log(abcelem);
        var el = document.getElementById("selection");
        el.innerHTML = "<b>selectionCallback parameter:</b><br>" + JSON.stringify(note);
    }

    zoomIn(settingIndex) {
        this.settingZoom += 0.1;
        this.setZoom(this.settingZoom);
    }

    zoomOut(settingIndex) {
        this.settingZoom -= 0.1;
        this.setZoom(this.settingZoom);
    }

    setZoom(settingZoom) {
        let papers = document.getElementsByClassName("paper") as HTMLCollectionOf<HTMLElement>;;
        for (var i = 0; i < papers.length; i++) {
            var x = papers[i];
            x.style.zoom = settingZoom + "";
        }
    }

    formatAbc(abc, isHtml = false) {
        return this.abcFormatter.format(abc);
    }

    formatString(str) {
        return this.strFormatter.format(str);
    }

    async getInformation() {
        this.theSessionService.getInformation("tunes", this.tuneId).subscribe(res => {
            this.name = this.formatString(res.name);
            this.member = this.strFormatter.format(res.member.name);
            this.memberId = res.member.id;
            this.date = res.date;
            this.type = res.type;
            this.tuneBookCount = res.tunebooks;
            this.recordingCount = res.recordings;
            this.settings = res.settings;
            this.aliases = res.aliases;
            this.comments = this.strFormatter.cleanComments(res.comments);
            this.multipleSettings = this.isMultipleSettings();
            this.gatherMultipleSettingOptions();
        });
    }

    getMeasure(type) {
        switch (type) {
            case "jig": return "6/8";
            case "slip jig": return "9/8";
            case "reel": case "hornpipe": case "barndance": case "strathspey": return "4/4";
            case "polka": return "2/4";
            case "slide": return "12/8";
            case "waltz": case "mazurka": return "3/4";
            case "three-two": return "3/2";
        }
    }

    setLeftSetting(val) {
        this.leftSettingCompare = val;
    }

    setRightSetting(val) {
        this.rigthSettingCompare = val;
    }

    compareSettings() {
        var left = this.settings[this.leftSettingCompare];
        var right = this.settings[this.rigthSettingCompare];

        var difference = this.comparer.compareAbcStrings(left.abc, right.abc);
        var percent = Math.round(difference * 10000) / 100;

        alert(this.strFormatter.formatSettingPercentage(percent, this.leftSettingCompare, this.rigthSettingCompare));
    }

    gatherMultipleSettingOptions() {
        this.leftOptions = new Array();
        this.rightOptions = new Array();
        for (var i = 0; i < this.settings.length; i++) {
            this.leftOptions.push(i + "");
            this.rightOptions.push(i + "");
        }
    }

    isMultipleSettings() {
        return this.settings.length > 1;
    }

    goToMember(memberId) {
        this.l.log("Navigating to member page: " + memberId)
        this.navCtrl.push(MemberPage, {
            "MemberId": memberId
        })
    }


    goToTuneRecordings(tuneId) {
        this.navCtrl.push(TuneRecordingsPage, {
            "TuneId": tuneId
        });
    }
}