import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  post: Post = { title: '', content: '', id: 0 }; // Initialize the post object with empty values
  faCoffee = faCoffee; // FontAwesome icon for coffee

  successMessage: string | null = null; // Variable to store success message
  errorMessage: string | null = null; // Variable to store error message

  constructor(
    private postService: PostService, // Inject PostService for making API calls
    private route: ActivatedRoute, // Inject ActivatedRoute to get route parameters
    private router: Router // Inject Router for navigation
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id']; // Get the post ID from route parameters
    if (id) {
      // If an ID is present, fetch the post for editing
      this.postService.getPost(+id).subscribe(post => {
        this.post = post; // Assign fetched post to the component's post property
      });
    }
  }

  onSubmit(): void {
    // Check if title and content are not empty
    if (!this.post.title.trim() || !this.post.content.trim()) {
      this.showErrorMessage('Title and content cannot be empty.'); // Show error message if empty
      return;
    }

    // Check if the post has an ID (indicating it's an update)
    if (this.post.id) {
      this.postService.updatePost(this.post.id, this.post).subscribe(() => {
        this.showSuccessMessage('Post updated successfully!'); // Show success message for update
        setTimeout(() => {
          this.router.navigate(['/posts']); // Navigate to posts list after 1 second
        }, 1000);
      });
    } else {
      // If no ID, create a new post
      this.postService.createPost(this.post).subscribe(() => {
        this.showSuccessMessage('Post created successfully!'); // Show success message for creation
        setTimeout(() => {
          this.router.navigate(['/posts']); // Navigate to posts list after 1 second
        }, 1000);
      });
    }
  }

  showSuccessMessage(message: string): void {
    this.successMessage = message; // Set the success message
    this.errorMessage = null; // Clear error message when showing success
    setTimeout(() => {
      this.successMessage = null; // Clear the success message after 3 seconds
    }, 3000);
  }

  showErrorMessage(message: string): void {
    this.errorMessage = message; // Set the error message
    this.successMessage = null; // Clear success message when showing error
    setTimeout(() => {
      this.errorMessage = null; // Clear the error message after 3 seconds
    }, 3000);
  }
}
