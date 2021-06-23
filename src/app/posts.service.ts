import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from './post.model';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class PostsService {

    constructor(private http: HttpClient) {}

    createAndStorePost(title: string, content: string) {
        let postData: Post = {title: title, content: content};
        this.http.post<{[key: string]: Post}>(
            'https://ng-recipe-book-89d3c-default-rtdb.firebaseio.com/posts.json', 
            postData
            ).subscribe(responseData => {
              console.log(responseData);
            })
    }

    fetchPosts() {
        this.http.get<{[key: string]: Post}>('https://ng-recipe-book-89d3c-default-rtdb.firebaseio.com/posts.json')
        .pipe(map((responseData) => {
          let postsArray: Post[] = [];
          for (const key in responseData) {
            if(responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key})
            }
          }
          return postsArray;
        }))
        .subscribe(posts => {
        })
    }
}