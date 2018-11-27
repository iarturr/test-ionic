import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { JwtInterceptor, AuthService } from './services';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AuthModule } from './modules/auth/auth.module';
import { LoginComponent } from './modules/auth/login/login.component';
import { SharedConstants } from './models';
import { AccountsComponent } from './modules/home/Accounts/accounts.component';
import { HomeModule } from './modules/home/home.module';
import { CreateAccountComponent } from './modules/home/Accounts/create-account.component';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    AuthModule,
    HomeModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginComponent,
    AccountsComponent,
    CreateAccountComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    JwtInterceptor,
    SharedConstants,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
