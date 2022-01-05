import { Injectable } from "@angular/core";
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse,
    HttpHandler,
    HttpEvent
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router'


@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
    constructor(private router: Router){

    }
    headers = new Headers({
        'Content-Type': 'application/json',
        'Token': localStorage.getItem("Token")
    });
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        console.log("intercepted request ... ");

        // Clone the request to add the new header.
        const authReq = req.clone({ headers: req.headers.set("Token", localStorage.getItem("Token")) });

        console.log("Sending request with new header now ...");

        //send the newly created request
        return next.handle(authReq)
            .catch(err => {
                // onError
                console.log(err);
                if (err instanceof HttpErrorResponse) {
                    console.log(err.status);
                    console.log(err.statusText);
                    if (err.status === 401) {
                        window.location.href = "/authentication/login";
                    }
                }
                return Observable.throw(err);
            }) as any;
    }
}
