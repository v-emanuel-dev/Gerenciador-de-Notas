import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostFormComponent } from './components/post-form/post-form.component';

const routes: Routes = [
  { path: 'posts', component: PostListComponent },
  { path: 'posts/new', component: PostFormComponent },
  { path: 'posts/edit/:id', component: PostFormComponent },
  { path: 'posts/:id', component: PostDetailComponent },
  { path: '', redirectTo: '/posts', pathMatch: 'full' },  // Redirecionamento padrão
  { path: '**', redirectTo: '/posts' }  // Para rotas não encontradas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
