import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { ApiResponse } from '@typesApp/interfacesRM';
import { QuerysService } from './querys.service';

@Injectable({
  providedIn: 'root',
})
export class RickAndMortyService {
  private baseURL = 'https://rickandmortyapi.com/api';

  // Signals globals
  isLoading = signal(false);
  hasError = signal(false);

  constructor(private http: HttpClient, private querys: QuerysService) {}

  private getResourse<T>(
    endpoint: string,
    params?: Record<string, string | number>
  ): Observable<ApiResponse> {
    this.isLoading.set(true);
    this.hasError.set(false);

    if (params) {
      const params = this.querys.getCurrentQueryParams();
    }

    return this.http.get<ApiResponse>(`${this.baseURL}/${endpoint}`).pipe(
      tap(() => this.isLoading.set(false)),
      catchError(() => {
        this.isLoading.set(false);
        this.hasError.set(true);
        return of({
          info: {
            count: 0,
            pages: 0,
            next: null,
            prev: null,
          },
          results: [],
        });
      })
    );
  }

  private charactersURL = 'https://rickandmortyapi.com/api/character';
  private locationsURL = 'https://rickandmortyapi.com/api/location';
  private episodesURL = 'https://rickandmortyapi.com/api/episode';

  // Character services
  getCharacters(): Observable<any> {
    return this.http.get<any>(this.charactersURL);
  }

  getNextPage(url: string): Observable<any> {
    return this.http.get<any>(url);
  }

  getPreviousPage(url: string): Observable<any> {
    return this.http.get<any>(url);
  }

  getCharacter(id: number): Observable<any> {
    return this.http.get<any>(`${this.charactersURL}/${id}`);
  }

  getCharacterByName(name: string, page: number = 1): Observable<any> {
    return this.http.get<any>(
      `${this.charactersURL}/?name=${name}&page=${page}`
    );
  }

  getCharactersByPage(page: number): Observable<any> {
    return this.http.get<any>(`${this.charactersURL}?page=${page}`);
  }

  getRandomPage(): Observable<any> {
    return this.http.get<any>(
      `${this.charactersURL}?page=${Math.floor(Math.random() * 42)}`
    );
  }

  getMultipleCharacters(ids: number[]): Observable<any> {
    // console.log(`${this.charactersURL}/${ids}`);
    return this.http.get<any>(`${this.charactersURL}/${ids}`);
  }

  // Location services

  getAllLocations(): Observable<any> {
    return this.http.get<any>(this.locationsURL);
  }

  getLocation(id: number): Observable<any> {
    return this.http.get<any>(`${this.locationsURL}/${id}`);
  }

  getLocationsByPage(page: number): Observable<any> {
    return this.http.get<any>(`${this.locationsURL}?page=${page}`);
  }

  getMultipleLocations(ids: number[]): Observable<any> {
    return this.http.get<any>(`${this.locationsURL}/${ids}`);
  }

  // Episode services

  getAllEpisodes(): Observable<any> {
    return this.http.get<any>(this.episodesURL);
  }

  getEpisode(id: number): Observable<any> {
    return this.http.get<any>(`${this.episodesURL}/${id}`);
  }

  getEpisodesByPage(page: number): Observable<any> {
    return this.http.get<any>(`${this.episodesURL}?page=${page}`);
  }

  getEpisodeByURL(url: string): Observable<any> {
    return this.http.get<any>(url);
  }
}
