import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';
import { saveAs } from 'file-saver';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  faCoffee = faCoffee;
  successMessage: string | null = null;
  filteredPosts: Post[] = [];
  searchTerm: string = '';
  isDarkTheme: boolean = false;

  constructor(private postService: PostService, private router: Router) {
    const savedTheme = localStorage.getItem('isDarkTheme');
    this.isDarkTheme = savedTheme ? JSON.parse(savedTheme) : false; // Se não houver, padrão será claro
   }

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.postService.getPosts().subscribe(posts => {
      this.posts = posts.reverse(); // Inverte a ordem dos posts
      this.filteredPosts = this.posts; // Inicializa filteredPosts com todos os posts
    });
  }

  deletePost(id: number): void {
    this.postService.deletePost(id).subscribe(() => {
      this.loadPosts(); // Recarrega a lista de posts após a exclusão
      this.showSuccessMessage('Nota excluída com sucesso!');
    });
  }

  exportAsTxt(post: any): void {
    const content = `Título: ${post.title}\n\nConteúdo:\n${post.content}`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, `${post.title}.txt`);
    this.showSuccessMessage('Nota exportada com sucesso!');
  }

  showSuccessMessage(message: string): void {
    this.successMessage = message;
    setTimeout(() => {
      this.successMessage = '';  // Limpa a mensagem após 3 segundos
    }, 1000);  // Exibe a mensagem por 3 segundos
  }

  filterPosts(): void {
    if (this.searchTerm) {
      this.filteredPosts = this.posts.filter(post =>
        post.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredPosts = this.posts; // Se a pesquisa estiver vazia, mostra todos os posts
    }
  }

  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    if (this.isDarkTheme) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }

}
