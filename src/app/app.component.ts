import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.http.post(
      'https://ng-recipe-book-89d3c-default-rtdb.firebaseio.com/posts.json', 
      postData
      ).subscribe(responseData => {
        console.log(responseData);
      })
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts() {
    this.http.get('https://ng-recipe-book-89d3c-default-rtdb.firebaseio.com/posts.json').subscribe(posts => {
      console.log(posts);
    })
  }
}
