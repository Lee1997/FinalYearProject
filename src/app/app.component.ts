import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

import { TheSessionService } from './services/thesession.service';
import { TunesPage } from '../pages/tunes/tunes'; 
import { RecordingsPage } from '../pages/recordings/recordings'
import { SessionsPage } from '../pages/sessions/sessions'
import { EventsPage } from '../pages/events/events'
import { DiscussionsPage } from '../pages/discussions/discussions'
import { TunebooksPage } from '../pages/tunebooks/tunebooks';
import { SearchPage } from '../pages/search/search';
import { StatisticsPage } from '../pages/statistics/statistics';

@Component({
  templateUrl: 'app.html',
  providers: [TheSessionService]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = StatisticsPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Tunes', component: TunesPage },
      { title: 'Recordings', component: RecordingsPage },
      { title: 'Sessions', component: SessionsPage },
      { title: 'Events', component: EventsPage },
      { title: 'Discussions', component: DiscussionsPage },
      { title: 'Saved TuneBooks', component: TunebooksPage },
      { title: "Statistics", component: StatisticsPage},
      { title: 'Search', component: SearchPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
