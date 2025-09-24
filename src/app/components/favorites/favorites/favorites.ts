import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FavoritesService } from '../../../services/favoritesApiService/favorites.service';
import { TokenService } from '../../../services/tokenService/token-service';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css',
})
export class FavoritesComponent implements OnInit {
  private router = inject(Router);
  private favoritesService = inject(FavoritesService);
  private tokenService = inject(TokenService);
  private cdr = inject(ChangeDetectorRef);

  favorites: string[] = [];
  userEmail: string = '';

  ngOnInit(): void {
    this.userEmail = this.tokenService.email ?? '';
    console.log(this.userEmail);
    if (this.userEmail) {
      this.favoritesService.getFavorites(this.userEmail).subscribe({
        next: (data) => {
          console.log(data);
          this.favorites = data.map((f: any) => f.catid);
          this.cdr.markForCheck();
        },
        error: (err) => console.error('Error loading favorites:', err),
      });
    }
  }

  removeFavorite(catId: string) {
    this.favoritesService.removeFavorite(catId, this.userEmail).subscribe({
      next: () => {
        this.favorites = this.favorites.filter((id) => id !== catId);
        this.cdr.markForCheck();
      },
      error: (err) => console.error('Error removing favorite:', err),
    });
  }
  gotohome() {
    this.router.navigate(['/cats']);
  }
  gotofavorites() {
    this.router.navigate(['/favorites']);
  }
}
