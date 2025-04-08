import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { ApiResponse, Character } from '@typesApp/interfacesRM';
import { QuerysService } from './querys.service';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RickAndMortyService {
  private baseURL = 'https://rickandmortyapi.com/api';

  // Signals globals
  isLoading = signal<boolean>(false);
  hasError = signal<boolean>(false);

  constructor(private http: HttpClient, private querys: QuerysService) {}

  private fetchResource<T>(
    endpoint: string, // endpoint is the path of the API
    allowedParams: string[] = [] // allowedParams is an array of strings that contains the allowed query params
  ): Observable<ApiResponse<T>> {
    this.isLoading.set(true);
    this.hasError.set(false);

    // The querys service is used to get the current query params
    const params = this.querys.getCurrentQueryParams();
    const filteredParams = this.filterParams(params, allowedParams);
    // filterParams is a function that filters the query params that are allowed to be used

    console.log(filteredParams);
    return this.http
      .get<ApiResponse<T>>(
        `${this.baseURL}/${endpoint}?${new URLSearchParams(filteredParams)}`
      )
      .pipe(
        tap(() => this.isLoading.set(false)),
        catchError(() => {
          this.isLoading.set(false);
          this.hasError.set(true);
          console.log('Error');
          return of({
            info: {
              count: 0,
              pages: 0,
              next: '',
              prev: '',
            },
            results: [],
          } as ApiResponse<T>);
        })
      );
  }

  // This function filters the query params that are allowed to be used
  private filterParams(
    params: Params,
    allowed: string[]
  ): Record<string, string> {
    return Object.entries(params)
      .filter(([key]) => allowed.includes(key))
      .reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: String(value),
        }),
        {}
      );

    // acc = accumulator (acumulador) to store the values, is equivalent to the object that will be returned
  }

  private charactersURL = 'https://rickandmortyapi.com/api/character';
  private locationsURL = 'https://rickandmortyapi.com/api/location';
  private episodesURL = 'https://rickandmortyapi.com/api/episode';

  // This function is used to get the characters
  getCharacters(): Observable<ApiResponse<Character>> {
    return this.fetchResource<Character>('character', [
      'page',
      'name',
      'status',
    ]);
  }

  // This function is used to get the details of a character
  getCharactersDetails(id: number): Observable<Character> {
    return this.http.get<Character>(`${this.baseURL}/character/${id}`);
  }

  getRandomPage(): Observable<any> {
    return this.http.get<any>(
      `${this.charactersURL}?page=${Math.floor(Math.random() * 42)}`
    );
  }

  getMultipleCharacters(ids: number[]): Observable<ApiResponse<Character>> {
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
