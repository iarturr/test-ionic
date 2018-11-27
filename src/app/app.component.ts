import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AuthService } from './services';
import { LoginComponent } from './modules/auth/login/login.component';
import { AccountsComponent } from './modules/home/Accounts/accounts.component';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public auth: AuthService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      if(this.auth.getToken() && !this.auth.isTokenExpired()) {
        this.rootPage = AccountsComponent;
      } else {
        this.rootPage = LoginComponent;
      }

    });
  }
}