import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders, HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '.';


@Injectable()

export class JwtInterceptor implements HttpInterceptor {

    constructor(public auth: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (this.auth.getToken) {
            request = request.clone({
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'x-access-token': this.auth.getToken()
                })
            });
        }
        return next.handle(request)
            .pipe(
                tap(event => {
                    if (event instanceof HttpResponse) {
                        if (event.body.token) {
                            this.auth.setToken(event.body.token);
                            this.auth.setUserInfo(event.body.token);
                        }
                    }
                }, error => {
                    console.error(error.message);
                })
            )

    };

}