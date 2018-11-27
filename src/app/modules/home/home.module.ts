import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TemplateModule } from '../template/template.module';

import { AccountsComponent } from './Accounts/accounts.component';
import { CreateAccountComponent } from './Accounts/create-account.component';


@NgModule({
    imports: [
        CommonModule,
        TemplateModule
        , FormsModule
        , ReactiveFormsModule
    ],
    declarations: [
        AccountsComponent,
        CreateAccountComponent,
    ]
})

export class HomeModule { }
