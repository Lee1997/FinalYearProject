import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TheSessionService } from '../../app/services/thesession.service';
import { TunePage } from '../tune/tune';
import { StringFormatter } from '../../utilities/StringFormatter';
import { Logger } from '../../utilities/Logger';

@Component({
    selector: 'page-tunes',
    templateUrl: 'tunes.html'
})

export class TunesPage {
    public newTunes : any;
    public popularTunes : any;
    public tuneSets : any;
    private stringFormatter : StringFormatter;
    private l : Logger;

    constructor(public navCtrl: NavController, private theSessionService: TheSessionService){
        this.l = new Logger();
        this.stringFormatter = new StringFormatter();
    }

    ngOnInit(){
        this.getTunes();
    }

    getTunes(){
        this.getNewTunes();
        this.getPopularTunes();
        this.getTuneSets();
    }

    goToTune(tuneId){
    this.l.log("Navigating to tune id: " + tuneId)
       this.navCtrl.push(TunePage, {
           "TuneId" : tuneId
       });
    }
  
    getNewTunes(){
        this.theSessionService.getItems('new', 'tunes')
        .subscribe(res => {
            this.newTunes = this.stringFormatter
                                .formatTuneSettings(res.settings);
        });
    }

    getPopularTunes(){
        this.theSessionService.getItems('popular', 'tunes').subscribe(res => {
            this.popularTunes = this.stringFormatter.formatPopularTunes(res.tunes);
        });
    }

    getTuneSets(){
        this.theSessionService.getItems('sets', 'tunes').subscribe(res => {
            this.tuneSets = this.stringFormatter.formatTuneSets(res.sets);
        });
    }
}