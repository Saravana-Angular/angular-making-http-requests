import { HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { tap } from "rxjs/operators";

export class LoggingInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest, next: HttpHandler) {
        console.log('Logging interceptor');
        console.log(req.headers);
        return next.handle(req).pipe(tap(event => {
            console.log(event);
            if(event.type === HttpEventType.Response) {
                console.log("response received and body data: ");
                console.log(event.body);
            }
        }));
    }
}