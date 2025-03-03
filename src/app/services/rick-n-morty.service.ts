import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RickAndMortyService {
  private apiUrl = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) {}

  // Character services
  getCharacters(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getNextPage(url: string): Observable<any> {
    return this.http.get<any>(url);
  }

  getPreviousPage(url: string): Observable<any> {
    return this.http.get<any>(url);
  }

  getCharacter(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getCharactersByPage(page: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?page=${page}`);
  }

  getRandomPage(): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}?page=${Math.floor(Math.random() * 42)}`
    );
  }

  // Location services

  getAllLocations(): Observable<any> {
    return this.http.get<any>('https://rickandmortyapi.com/api/location');
  }

  getLocation(id: number): Observable<any> {
    return this.http.get<any>(`https://rickandmortyapi.com/api/location/${id}`);
  }

  getLocationsByPage(page: number): Observable<any> {
    return this.http.get<any>(
      `https://rickandmortyapi.com/api/location?page=${page}`
    );
  }

  // Episode services

  getAllEpisodes(): Observable<any> {
    return this.http.get<any>('https://rickandmortyapi.com/api/episode');
  }

  getEpisode(id: number): Observable<any> {
    return this.http.get<any>(`https://rickandmortyapi.com/api/episode/${id}`);
  }

  getEpisodesByPage(page: number): Observable<any> {
    return this.http.get<any>(
      `https://rickandmortyapi.com/api/episode?page=${page}`
    );
  }
}
