import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";

export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest, next: HttpHandler) {
        console.log("Request is on its way");
        return next.handle(req);
    }
}