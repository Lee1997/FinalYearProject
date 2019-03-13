import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { TheSessionService } from "../../app/services/thesession.service";
import { NativeStorage } from "@ionic-native/native-storage/ngx";
import { MemberPage } from "../member/member";
import { ReferenceStrings } from "../../utilities/ReferenceStrings";

@Component({
    selector: 'page-tunebooks',
    templateUrl: 'tunebooks.html'
})

export class TunebooksPage {

    public savedTunebooks: any;

    constructor(public navCtrl: NavController, private theSessionService: TheSessionService, private nativeStorage: NativeStorage) {
        this.get()
    }

    get() {
        this.nativeStorage.getItem(ReferenceStrings.SavedUsers).then(
            data => {
                this.savedTunebooks = data;
            },
            error => {
                alert("You have no saved tunes!");
            }
        )
    }

    clear() {
        this.nativeStorage.clear();
    }

    goToTunebook(memberId) {
        this.navCtrl.push(MemberPage, {
            "MemberId": memberId
        });
    }

    async getMemberName(memberId) {
        await this.theSessionService.getInformation("member", memberId).subscribe(res => {
            return res.name;
        });
    }

    ngOnInit() { }
}