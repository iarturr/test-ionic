import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { SharedConstants } from '../models';
import { HttpClient } from '@angular/common/http';

export const TOKEN_NAME: string = 'key_jwt_token';

@Injectable()
export class AuthService {

    constructor(private http: HttpClient, private constants: SharedConstants) { }

    getToken(): string {
        let token = '';
        if (typeof window !== 'undefined') {
            token = localStorage.getItem(TOKEN_NAME) || '';
        }
        return token;
    }

    setToken(token: string): void {
        if (typeof window !== 'undefined') {
            localStorage.setItem(TOKEN_NAME, token);
        }
    }

    getTokenExpirationDate(token: string): any {
        try {
            const decoded = jwt_decode(token);
            if (decoded.exp === undefined) {
                return new Date(0);
            }
            const date = new Date(0);
            date.setUTCSeconds(decoded.exp);
            return date;
        } catch (e) {
            return undefined;
        }
    }

    isTokenExpired(token?: string): boolean {
        if (!token) {
            token = this.getToken();
        }
        if (!token) {
            return true;
        }

        const date = this.getTokenExpirationDate(token);
        if (date === undefined) {
            return true;
        }
        return !(date.valueOf() > new Date().valueOf());
    }

    setUserInfo(token?: string): void {
        if (!token) {
            token = this.getToken();
        } else {
            const decoded = jwt_decode(token);
            localStorage.setItem('userId', decoded.id);
            localStorage.setItem('userName', decoded.firstname + ' ' + decoded.lastname);
        }
    }

    getUserInfo(token?: string): object {
        if (!token) {
            token = this.getToken();
        }
        if (!token) {
            return {};
        } else {
            const decoded = jwt_decode(token);
            return decoded;
        }
    }

    deleteToken(): void {
        if (typeof window !== 'undefined') {
            localStorage.removeItem(TOKEN_NAME);
            localStorage.removeItem('userId');
            localStorage.removeItem('userName');
        }
    }

    login(data: object) {
        return this.http.post(this.constants.ApiHostName + '/auth/user/authenticate', data);
    }

    signup(data: object) {
        return this.http.post(this.constants.ApiHostName + '/auth/user/create', data);
    }
    
}
