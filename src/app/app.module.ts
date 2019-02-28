import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule , NO_ERRORS_SCHEMA} from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

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
import { AccordionComponent } from '../components/accordion/accordion';
import { NavigationBarComponent } from '../components/navigationBar/navigationBar';
import { AppSettingsPage } from '../pages/app-settings/app-settings';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { HttpModule } from '@angular/http';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ILogger } from '../utilities/Logger';

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
    AccordionComponent,
    NavigationBarComponent,
    AppSettingsPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {mode: 'ios'})
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
    TunePage,
    AccordionComponent,
    NavigationBarComponent,
    AppSettingsPage
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
  ]
})
export class AppModule {}
