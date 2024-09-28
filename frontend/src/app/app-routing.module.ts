import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostFormComponent } from './components/post-form/post-form.component';

// Define the application routes
const routes: Routes = [
  { path: 'posts', component: PostListComponent },  // Route for the list of posts
  { path: 'posts/new', component: PostFormComponent },  // Route to create a new post
  { path: 'posts/edit/:id', component: PostFormComponent },  // Route to edit a post by ID
  { path: 'posts/:id', component: PostDetailComponent },  // Route to view a specific post by ID
  { path: '', redirectTo: '/posts', pathMatch: 'full' },  // Default redirection to posts
  { path: '**', redirectTo: '/posts' }  // Redirect for non-existing routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  // Importing the RouterModule with the defined routes
  exports: [RouterModule]  // Exporting RouterModule to make it available throughout the application
})
export class AppRoutingModule {}
