import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TheSessionService } from '../../app/services/thesession.service';
import { StringFormatter } from '../../utilities/StringFormatter';
import { AbcFormatter } from '../../utilities/AbcFormatter';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Logger } from '../../utilities/Logger';
import abcjs from "abcjs";
import { AbcStringComparer } from '../../utilities/AbcStringComparer';



@Component({
    selector: 'page-tune',
    templateUrl: 'tune.html'
})

export class TunePage {
    public name : string;
    public member : string;
    public date: string;
    public type: string;
    public tuneBookCount: string;
    public recordingCount: string;
    public settings: any;
    public multipleSettings: boolean;
    public comments: JSON;
    public aliases: any;
    public leftOptions : string[];
    private leftSettingCompare : number;
    private rigthSettingCompare : number;
    public rightOptions: string[];

    private tuneId : string;
    private abcFormatter : AbcFormatter;
    private strFormatter : StringFormatter;
    private l : Logger;
    private comparer : AbcStringComparer;

    constructor(navParam : NavParams, public navCtrl: NavController, private theSessionService: TheSessionService, private nativeStorage: NativeStorage){
        this.l = new Logger();
        this.comparer = new AbcStringComparer();
        this.tuneId = navParam.get('TuneId');
        this.getInformation();
        this.abcFormatter = new AbcFormatter();
        this.strFormatter = new StringFormatter();
    }

    ngOnInit(){
    }

    async renderNotes(settingIndex, abc){
        var notationId = 'notation' + settingIndex;

        abc = this.formatAbc(abc);
        abcjs.renderAbc(notationId, abc);
        

        document.getElementById('notationButton' + settingIndex).style.display = "none";
        document.getElementById('settingControlsBox' + settingIndex).style.display = "flex";

        var x = document.getElementById('notation' + settingIndex);
        x.style.overflowX = "scroll";
        this.nativeStorage.getItem('defaultTuneNotationZoom')
                            .then(
                                data => x.style.zoom = data["zoom"],
                                error => { 
                                        this.l.logError("Error getting zoom value", error);
                                        x.style.overflowX = "0.7"; 
                                    }
                            );

        //var x = document.getElementById("abc" + settingIndex);
        //alert("midi" + settingIndex)
        // var abc_editor = new ABCJS.Editor("abc" + settingIndex, {
        //     paper_id: notationId,
        //     generate_midi: true,
        //     midi_id: "midi0",
        //     warnings_id: "warnings0"
        // });
        // //abc_editor.show_midi()

        // // abcjs.renderAbc(notationId, abc, {
        // //     paperId: notationId,
        // //     midi_id:"midi" + settingIndex,
        // //     midi_download_id: "midi-download" + settingIndex,
        // //     generate_warnings: true,
        // //     warnings_id:"warnings" + settingIndex,
        // //     abcjsParams: {
        // //         generateDownload: true,
        // //         clickListener: () => { alert(); }
        // //     },
        // //     downloadLabel: "Down"
        // // }, {}, {});

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

    zoomIn(settingIndex){
        this.l.log("zooming in on setting " + settingIndex)
        var x = document.getElementById('notation' + settingIndex);
        x.style.zoom = String(parseFloat(x.style.zoom) + 0.1);
        this.l.log("Notation for setting " + settingIndex + "zoomed to " + x.style.zoom)
    }

    zoomOut(settingIndex, funct){
        this.l.log("zooming out on setting " + settingIndex)
        var x = document.getElementById('notation' + settingIndex);
        x.style.zoom = String(parseFloat(x.style.zoom) - 0.1);
        this.l.log("Notation for setting " + settingIndex + "zoomed to " + x.style.zoom)
    }

    formatAbc(abc, isHtml = false){
        return this.abcFormatter.format(abc, isHtml);
    }

    formatString(str){
        return this.strFormatter.format(str);
    }

    getInformation(){
        this.theSessionService.getInformation("tunes", this.tuneId).subscribe(res => {
            this.name = this.formatString(res.name);
            this.member = this.strFormatter.format(res.member.name);
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

    async tryFill(location, value){
        try{
            location = value;
        }catch(e){
            this.l.log("Error filling variable with value: " + value)
        }
    }

    getMeasure(type){
        switch(type){
            case "jig": return "6/8";
            case "slipjig": return "9/8";
            case "reel": case "hornpipe": case "barndance": case "strathspey": return "4/4";
            case "polka": return "2/2";
            case "slide": return "12/8";
            case "waltz": case "mazurka": return "3/4";
            case "threetwo": return "3/2";
        }
    }

    setLeftSetting(val){
        this.leftSettingCompare = val;
    }

    setRightSetting(val){
        this.rigthSettingCompare = val;
    }

    compareSettings(){
        var left = this.settings[this.leftSettingCompare];
        var right = this.settings[this.rigthSettingCompare];

        var percent = this.comparer.compareAbcStrings(left.abc, right.abc);

        alert(this.strFormatter.formatSettingPercentage(percent, this.leftSettingCompare, this.rigthSettingCompare));
    }

    gatherMultipleSettingOptions(){
        this.leftOptions = new Array();
        this.rightOptions = new Array();
        for(var i = 0; i < this.settings.length; i++){
            this.leftOptions.push(i + "");
            this.rightOptions.push(i + "");
        }
    }

    isMultipleSettings(){
        return this.settings.length > 1;
    }
}