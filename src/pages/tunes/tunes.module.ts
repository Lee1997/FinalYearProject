import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { TunesPage } from './tunes';

@NgModule({
    declarations: [
        TunesPage
    ],
    imports: [
        IonicPageModule.forChild(TunesPage),
        TranslateModule.forChild()
    ]
})
export class TunePageModule { }