import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { ChartsModule } from 'ng2-charts';
import { MyApp } from './app.component';
import { TunesPage } from '../pages/tunes/tunes';
import { TunePage } from '../pages/tune/tune';
import { RecordingsPage } from '../pages/recordings/recordings';
import { RecordingPage } from '../pages/recording/recording';
import { SessionsPage } from '../pages/sessions/sessions';
import { SessionPage } from '../pages/session/session';
import { EventsPage } from '../pages/events/events';
import { EventPage } from '../pages/event/event';
import { DiscussionsPage } from '../pages/discussions/discussions';
import { DiscussionPage } from '../pages/discussion/discussion';
import { TunebooksPage } from '../pages/tunebooks/tunebooks';
import { AccordionComponent } from '../components/accordion/accordion';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { HttpModule } from '@angular/http';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ILogger } from '../utilities/Logger';
import { MemberPage } from '../pages/member/member';
import { TuneRecordingsPage } from '../pages/tune-recordings/tune-recordings';
import { SearchPage } from '../pages/search/search';
import { StatisticsPage } from '../pages/statistics/statistics';

@NgModule({
  declarations: [
    MyApp,
    TunesPage,
    TunePage,
    RecordingsPage,
    RecordingPage,
    SessionsPage,
    SessionPage,
    EventsPage,
    EventPage,
    DiscussionsPage,
    DiscussionPage,
    TunebooksPage,
    TuneRecordingsPage,
    AccordionComponent,
    MemberPage,
    SearchPage,
    StatisticsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {mode: 'ios'}),
    ChartsModule
    ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TunesPage,
    RecordingsPage,
    RecordingPage,
    SessionsPage,
    SessionPage,
    EventsPage,
    EventPage,
    DiscussionsPage,
    DiscussionPage,
    TunebooksPage,
    TuneRecordingsPage,
    TunePage,
    AccordionComponent,
    MemberPage,
    SearchPage,
    StatisticsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NativeStorage,
    ILogger
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ],
})
export class AppModule {}
