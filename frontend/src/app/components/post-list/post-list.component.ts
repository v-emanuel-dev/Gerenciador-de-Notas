import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';
import { saveAs } from 'file-saver';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];               // Array to hold all posts
  successMessage: string | null = null;  // Message to display success
  errorMessage: string | null = null;    // Message to display errors
  filteredPosts: Post[] = [];       // Array to hold filtered posts based on search
  searchTerm: string = '';           // Search term input
  noteContent: string = '';          // Field to store the content of the note

  constructor(private postService: PostService, private router: Router) {
    // Load theme preference from localStorage (if applicable)
    const savedTheme = localStorage.getItem('isDarkTheme');
    // You may want to implement theme switching logic here
  }

  ngOnInit(): void {
    this.loadPosts(); // Load posts when the component initializes
  }

  // Method to load posts from the service
  loadPosts(): void {
    this.postService.getPosts().subscribe(posts => {
      this.posts = posts.reverse(); // Reverse the order of posts for display
      this.filteredPosts = this.posts; // Initialize filteredPosts with all posts
    });
  }

  // Method to delete a post by its ID
  deletePost(id: number): void {
    this.postService.deletePost(id).subscribe(() => {
      this.loadPosts(); // Reload the list of posts after deletion
      this.showSuccessMessage('Note deleted successfully!'); // Show success message
    });
  }

  // Method to create a new post
  createPost(): void {
    // Check if the note content is empty or contains only whitespace
    if (!this.noteContent || !this.noteContent.trim()) {
      this.errorMessage = 'Note content cannot be empty!'; // Set error message
      return; // Exit the method if content is invalid
    }

    // Create the newPost object
    const newPost: Post = {
      id: 0,                           // Temporary ID, will be assigned by the server
      title: this.noteContent,         // Set title as note content
      content: this.noteContent        // Set content as note content
    };

    this.postService.createPost(newPost).subscribe(() => {
      this.loadPosts();               // Reload posts after creation
      this.noteContent = '';          // Clear the input field
      this.successMessage = 'Note created successfully!'; // Set success message
      this.errorMessage = null;       // Clear error message
    });
  }

  // Method to export a post as a .txt file
  exportAsTxt(post: Post): void {
    const content = `Título: ${post.title}\n\nConteúdo:\n${post.content}`; // Format content
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' }); // Create a Blob for the content
    saveAs(blob, `${post.title}.txt`); // Use FileSaver to save the file
    this.showSuccessMessage('Note exported successfully!'); // Show success message
  }

  // Method to display a success message for a short time
  showSuccessMessage(message: string): void {
    this.successMessage = message; // Set the success message
    setTimeout(() => {
      this.successMessage = ''; // Clear the message after 1 second
    }, 1500);
  }

  // Method to filter posts based on the search term
  filterPosts(): void {
    if (this.searchTerm) {
      // Filter posts that include the search term in the title or content
      this.filteredPosts = this.posts.filter(post =>
        post.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(this.searchTerm.toLowerCase()) // Add this line
      );
    } else {
      this.filteredPosts = this.posts; // If the search is empty, show all posts
    }
  }
}
