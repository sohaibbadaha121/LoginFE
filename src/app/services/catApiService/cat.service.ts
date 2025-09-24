import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Cat {
  id: string;
  createdAt: string;
  mimetype: string;
  tags: string[];
  imageUrl: string;
}

@Injectable({
  providedIn: 'root',
})
export class CatService {
  constructor(private http: HttpClient) {}

  getCats(skip: number, limit: number) {
    return this.http
      .get<any[]>(`https://cataas.com/api/cats?skip=${skip}&limit=${limit}`)
      .pipe(
        map((res) =>
          res.map((cat) => ({
            ...cat,
            imageUrl: `https://cataas.com/cat/${cat.id}`,
          }))
        )
      );
  }
}
