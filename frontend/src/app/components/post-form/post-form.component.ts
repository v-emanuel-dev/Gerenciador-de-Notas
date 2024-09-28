import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';
import { faCoffee, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  post: Post = { title: '', content: '', id: 0 };
  faCoffee = faCoffee;
  faSun = faSun;
  faMoon = faMoon;

  successMessage: string | null = null;
  errorMessage: string | null = null;  // Variável para mensagem de erro

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
    if (!this.post.title.trim() || !this.post.content.trim()) {
      this.showErrorMessage('O título e o conteúdo não podem estar vazios.');
      return;
    }

    if (this.post.id) {
      this.postService.updatePost(this.post.id, this.post).subscribe(() => {
        this.showSuccessMessage('Nota atualizada com sucesso!');
        setTimeout(() => {
          this.router.navigate(['/posts']);
        }, 1000);
      });
    } else {
      this.postService.createPost(this.post).subscribe(() => {
        this.showSuccessMessage('Nota criada com sucesso!');
        setTimeout(() => {
          this.router.navigate(['/posts']);
        }, 1000);
      });
    }
  }

  showSuccessMessage(message: string): void {
    this.successMessage = message;
    this.errorMessage = null;  // Limpa a mensagem de erro ao mostrar sucesso
    setTimeout(() => {
      this.successMessage = null;
    }, 3000);
  }

  showErrorMessage(message: string): void {
    this.errorMessage = message;
    this.successMessage = null;  // Limpa a mensagem de sucesso ao mostrar erro
    setTimeout(() => {
      this.errorMessage = null;
    }, 3000);
  }
}
