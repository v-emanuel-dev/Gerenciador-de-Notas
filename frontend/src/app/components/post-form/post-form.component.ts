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
  post: Post = { title: '', content: '', id: 0 };
  faCoffee = faCoffee;
  successMessage: string | null = null; // Permite que successMessage seja string ou null

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.postService.getPost(+id).subscribe(post => {
        this.post = post;
      });
    }
  }

  onSubmit(): void {
    if (this.post.id) {
      this.postService.updatePost(this.post.id, this.post).subscribe(() => {
        this.showSuccessMessage('Nota atualizada com sucesso!');
        setTimeout(() => {
          this.router.navigate(['/posts']);
        }, 1000); // Redireciona após 3 segundos
      });
    } else {
      this.postService.createPost(this.post).subscribe(() => {
        this.showSuccessMessage('Nota criada com sucesso!');
        setTimeout(() => {
          this.router.navigate(['/posts']);
        }, 1000); // Redireciona após 3 segundos
      });
    }
  }

  showSuccessMessage(message: string): void {
    this.successMessage = message;
    setTimeout(() => {
      this.successMessage = null; // Remove a mensagem após 3 segundos
    }, 3000);
  }
}
