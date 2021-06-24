import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";

export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest, next: HttpHandler) {
        console.log(req.url);
        const modifiedReq = req.clone({headers: req.headers.append('Auth', 'xyz')});
        console.log("Request is on its way");
        return next.handle(modifiedReq);
    }
}