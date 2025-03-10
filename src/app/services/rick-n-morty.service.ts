import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RickAndMortyService {
  private charactersURL = 'https://rickandmortyapi.com/api/character';
  private locationsURL = 'https://rickandmortyapi.com/api/location';
  private episodesURL = 'https://rickandmortyapi.com/api/episode';

  constructor(private http: HttpClient) {}

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
}
