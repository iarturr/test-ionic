import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { SharedConstants } from '../../../models';
import { HttpClient } from '@angular/common/http';
import { AccountsComponent } from './accounts.component';

@Component({
  selector: 'create-account-component',
  templateUrl: 'create-account.component.html'
})
export class CreateAccountComponent {

  constructor(public navCtrl: NavController, private http: HttpClient, private constants: SharedConstants, public alertCtrl: AlertController) {
  }

  cardKind: object;
  name: string = '';
  kindSelected: any;

  ngOnInit(): void {

    this.http.get(this.constants.ApiHostName + 'catalogs/cards').subscribe(
      (resp: any) => {
        this.cardKind = resp.response.type_cards;
      }, (error: Response) => {
        console.log(error);
      }
    );
  }

  requestAccount(): void {
    if (this.kindSelected === undefined) {
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: 'Es necesario seleccionar el tipo de tarjeta',
        buttons: ['OK']
      });
      alert.present();
      return;
    }

    let data = {
      userId: localStorage.getItem('userId'),
      type: this.kindSelected.type,
      name: this.kindSelected.name
    };
    
    this.http.post(this.constants.ApiHostName + 'accounts', data).subscribe(
      (resp: any) => {
        let alert = this.alertCtrl.create({
          title: 'Exito',
          subTitle: resp.success,
          buttons: [{
            text: 'Ok',
            handler: () => {
              this.navCtrl.setRoot(AccountsComponent);
            }
          }]
        });
        alert.present();
      }, (error: Response) => {
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: 'Hubo un error al intentar solicitar la cuenta',
          buttons: ['OK']
        });
        alert.present();
      }
    );
  }

}
