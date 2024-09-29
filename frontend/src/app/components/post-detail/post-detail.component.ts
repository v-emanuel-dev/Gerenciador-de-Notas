import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  post: Post | undefined;
  isEditing = false; // Controls the edit mode

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    // Get the post ID from the current route parameters
    const id = this.route.snapshot.params['id'];

    // Fetch the post using the PostService
    this.postService.getPost(+id).subscribe(post => {
      this.post = post; // Assign the fetched post data to the post variable
    });
  }

  // Function to toggle edit mode
  editPost(): void {
    this.isEditing = !this.isEditing; // Toggle the editing state
  }

  // Function to save the updated post (you can add an API call here)
  savePost(): void {
    if (this.post) {
      this.postService.updatePost(this.post.id, this.post).subscribe(() => {
        this.isEditing = false; // Exit edit mode after saving
      });
    }
  }
}
