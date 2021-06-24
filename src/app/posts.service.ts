import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from './post.model';
import { catchError, map, tap } from 'rxjs/operators';
import { Subject, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PostsService {

    error = new Subject<string>();

    constructor(private http: HttpClient) {}

    createAndStorePost(title: string, content: string) {
        let postData: Post = {title: title, content: content};
        this.http.post<{[key: string]: Post}>(
            'https://ng-recipe-book-89d3c-default-rtdb.firebaseio.com/posts.json', 
            postData, {
              observe: 'response'
            }
            ).subscribe(responseData => {
              console.log(responseData);
            }, error => {
              this.error.next(error.message);
            })
    }

    fetchPosts() {

        let searchParams = new HttpParams().set('print','pretty');
        searchParams = searchParams.append('custom', 'key');

        return this.http.get<{[key: string]: Post}>(
          'https://ng-recipe-book-89d3c-default-rtdb.firebaseio.com/posts.json', 
          {
            headers: new HttpHeaders({'Custom-Header': 'Hello' }),
            params: searchParams
          }
          )
        .pipe(map((responseData) => {
          let postsArray: Post[] = [];
          for (const key in responseData) {
            if(responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key})
            }
          }
          return postsArray;
        }), catchError(errorRes => {
          // send to server analytics
          return throwError(errorRes);
        }))
    }

    deletePosts() {
        return this.http.delete(
          'https://ng-recipe-book-89d3c-default-rtdb.firebaseio.com/posts.json',
          {
            observe: 'events'
          })
        .pipe(tap((event) => {
          console.log(event)
          if(event.type === HttpEventType.Sent) {
            //....
          }
          if(event.type === HttpEventType.Response) {
            console.log(event.body); 
          }
        }));
    }
}