import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { AuthService } from '../../../services';
import { AccountsComponent } from '../../home/Accounts/accounts.component';

@Component({
  selector: 'login-component',
  templateUrl: 'login.component.html'
})
export class LoginComponent {

  displayLogin: boolean = true;

  firstname: string = '';
  lastname: string = '';
  email: string = '';
  password: string = '';

  title: string = 'Iniciar sesión';

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public loadingCtrl: LoadingController, private auth: AuthService) { }


  doLogin() {
    if (this.displayLogin) {

      if (this.email === '' || this.password === '') {
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: 'Todos los campos son requeridos',
          buttons: ['OK']
        });
        alert.present();
        return;
      }

      let loader = this.loadingCtrl.create({
        content: "Cargando..."
      });
      loader.present();

      this.auth.login({ 'email': this.email, 'password': this.password }).subscribe(() => {
        loader.dismissAll();
        this.navCtrl.setRoot(AccountsComponent);
      }, (err) => {
        loader.dismissAll();
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: err.error.success,
          buttons: ['OK']
        });
        alert.present();
      });

    } else {
      this.displayLogin = true;
      this.title = 'Iniciar sesión';
    }
  }

  doRegister() {
    if (!this.displayLogin) {
      if (this.firstname === '' || this.lastname === '' || this.email === '' || this.password === '') {
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: 'Todos los campos son requeridos',
          buttons: ['OK']
        });
        alert.present();
        return;
      }

      let userData = {
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        password: this.password,
      };
      console.log(userData);

      let loader = this.loadingCtrl.create({
        content: "Registrando usuario..."
      });
      loader.present();

      this.auth.signup(userData).subscribe(() => {
        this.auth.login({ 'email': userData.email, 'password': userData.password }).subscribe(() => {
          loader.dismissAll();
          this.navCtrl.setRoot(AccountsComponent);
        });

      }, (err) => {
        loader.dismissAll();
        let alert = this.alertCtrl.create({
          title: 'Register Error',
          subTitle: err.error.success,
          buttons: ['OK']
        });
        alert.present();
      });

    } else {
      this.displayLogin = false;
      this.title = 'Registrar usuario';
    }
  }

}
