import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TemplateModule } from '../template/template.module';

import { LoginComponent } from './login/login.component';


@NgModule({
    imports: [
        CommonModule,
        TemplateModule
        , FormsModule
        , ReactiveFormsModule
    ],
    declarations: [
        LoginComponent,
    ]
})

export class AuthModule { }
