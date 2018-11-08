import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { LoginService } from "../services/login.service";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
// https://medium.com/@ryanchenkie_40935/angular-authentication-using-the-http-client-and-http-interceptors-2f9d1540eb8

@Injectable()
export class AddHeaderInterceptor implements HttpInterceptor {
    constructor(private loginservice: LoginService ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${this.loginservice.getToken()}`
            }
        })

        return next.handle(request);
    }
}
