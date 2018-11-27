import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { SharedConstants } from '../../../models';
import { HttpClient } from '@angular/common/http';
import { CreateAccountComponent } from './create-account.component';
import { AuthService } from '../../../services';
import { LoginComponent } from '../../auth/login/login.component';

@Component({
  selector: 'account-component',
  templateUrl: 'accounts.component.html'
})
export class AccountsComponent {

  constructor(public navCtrl: NavController, private http: HttpClient, private constants: SharedConstants, private auth: AuthService, public alertCtrl: AlertController) {
  }

  userName: string = '';
  userAccounts: any = [];

  ngOnInit(): void {

    this.userName = localStorage.getItem('userName');

    this.http.get(this.constants.ApiHostName + 'accounts', {}).subscribe(
      (resp: any) => {
        this.userAccounts = resp.response;
        // this.userAccounts.push({
        //   name: 'Tarjeta de oro',
        //   balance: 0,
        //   type: 'TDC',
        // });
        // this.userAccounts.push({
        //   name: 'Tarjeta de plata',
        //   balance: 0,
        //   type: 'TDD',
        // });
      }, (error: Response) => {
        console.log(error);
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: 'Hubo un error al intentar al consultar las cuentas',
          buttons: ['OK']
        });
        alert.present();
      }
    );
  }

  addAccount(){
    this.navCtrl.push(CreateAccountComponent);
  }

  logout(){
    this.auth.deleteToken();
    this.navCtrl.setRoot(LoginComponent);

  }

}
