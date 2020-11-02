import { Component, OnInit } from '@angular/core';
import { Post } from '../model/post.model';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  posts: Post[] = [];
  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.httpService.getPosts().subscribe((data) => {
      this.posts = data;
    });
  }
}
