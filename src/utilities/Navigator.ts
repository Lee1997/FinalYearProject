import { Logger } from "./Logger";
import { NavController } from "ionic-angular";
import { TunePage } from '../pages/tune/tune';
import { TheSessionService } from "../app/services/thesession.service";

export class Navigator{

    private l : Logger = new Logger();

    constructor(public navCtrl: NavController, private theSessionService: TheSessionService){}

    navigateToTune(tuneId){
        this.l.log("Navigating to tune id: " + tuneId);
        this.navCtrl.push(TunePage,{
            "TuneId": tuneId,
            "navCtrl": this.navCtrl,
            "theSessionService": this.theSessionService
        });
    }
}