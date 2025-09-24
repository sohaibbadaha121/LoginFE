import {
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TokenService } from '../../../services/tokenService/token-service';
import { Router } from '@angular/router';
import { FavoritesService } from '../../../services/favoritesApiService/favorites.service';
import { CatService } from '../../../services/catApiService/cat.service';

@Component({
  selector: 'app-cats',
  imports: [CommonModule],
  templateUrl: './cats.html',
  styleUrls: ['./cats.css'],
})
export class Cats implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);
  private catService = inject(CatService);
  private tokenservice = inject(TokenService);
  private router = inject(Router);
  private favoritesService = inject(FavoritesService);

  cats: any[] = [];
  skip = 0;
  limit = 8;

  favorites: string[] = [];
  userEmail: string = '';

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.userEmail = this.tokenservice.email ?? '';
      this.loadFavorites();
      this.initialLoad();
    }
  }

  initialLoad() {
    this.skip = 0;
    this.limit = 8;
    this.fetchCats();
  }

  fetchCats() {
    this.catService.getCats(this.skip, this.limit).subscribe({
      next: (data) => {
        this.cats = [...data];
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error fetching cats:', err);
      },
    });
  }

  loadFavorites() {
    if (!this.userEmail) return;
    this.favoritesService.getFavorites(this.userEmail).subscribe({
      next: (data) => {
        console.log(data);
        this.favorites = data.map((f: any) => f.catid);
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error loading favorites:', err);
      },
    });
  }

  toggleFavorite(catId: string) {
    if (this.isFavorite(catId)) {
      this.favoritesService.removeFavorite(catId, this.userEmail).subscribe({
        next: () => {
          this.favorites = [...this.favorites, catId];
          this.favorites = this.favorites.filter((id) => id !== catId);
          this.cdr.markForCheck();
        },
        error: (err) => console.error('Error removing favorite:', err),
      });
    } else {
      this.favoritesService.saveFavorite(catId, this.userEmail).subscribe({
        next: () => {
          this.favorites.push(catId);
          this.cdr.markForCheck();
        },
        error: (err) => console.error('Error saving favorite:', err),
      });
    }
  }

  isFavorite(catId: string): boolean {
    return this.favorites.includes(catId);
  }

  logout() {
    this.tokenservice.clear();
    this.router.navigate(['/login']);
  }
  nextPage() {
    this.skip += this.limit;
    this.fetchCats();
  }
  prevPage() {
    if (this.skip >= this.limit) {
      this.skip -= this.limit;
      this.fetchCats();
    }
  }
  gotohome() {
    this.router.navigate(['/cats']);
  }
  gotofavorites() {
    this.router.navigate(['/favorites']);
  }
}
