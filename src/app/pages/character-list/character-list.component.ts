import { Component, signal } from '@angular/core';
import { RickAndMortyService } from '@services/rick-n-morty.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '@components/pagination/pagination.component';
import { SearchBarComponent } from '@components/search-bar/search-bar.component';
import { QuerysService } from '@services/querys.service';
import { CharacterItemComponent } from '@components/character-item/character-item.component';
import { setCharactersWithLoading } from '@utils/setCharactersWithLoading';
import { ApiResponse, Character, InfoData } from '@typesApp/interfacesRM';
import { catchError, Observable, of, shareReplay, Subscription } from 'rxjs';

@Component({
  selector: 'app-character-list',
  imports: [
    RouterModule,
    CommonModule,
    PaginationComponent,
    SearchBarComponent,
    CharacterItemComponent,
  ],
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.css',
})
export class CharacterListComponent {
  characters$: Observable<ApiResponse<Character>> = new Observable<
    ApiResponse<Character>
  >();
  info: InfoData = {} as InfoData;
  pageCurrent = signal<number>(1);
  listPages: number[] = [];
  searchTerm: string = ''; // Variable to store the search term
  errorSearch: boolean = false;

  defaultParams = ['name', 'page'];

  // Subscription to manage the observables
  private subscriptions: Subscription = new Subscription();

  constructor(
    public rickAndMortyService: RickAndMortyService,
    private queryService: QuerysService
  ) {}

  ngOnInit() {
    this.initializeFromQueryParams();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private initializeFromQueryParams() {
    const queryParam = this.queryService.getQueryParam();

    // If there is a search term in the URL
    if (queryParam[this.defaultParams[0]]) {
      this.searchTerm = queryParam[this.defaultParams[0]];
      this.searchCharacter(this.searchTerm);
    } else if (
      +queryParam[this.defaultParams[1]] &&
      +queryParam[this.defaultParams[1]] > 1
    ) {
      // If there is a page parameter in the URL
      this.goToPage(+queryParam[this.defaultParams[1]]);
    } else {
      // Default case: load the first page
      this.fetchCharacters();
    }
  }

  fetchCharacters() {
    const data$ = this.rickAndMortyService
      .getCharacters()
      .pipe(
        shareReplay(1),
        catchError((error) => {
          console.log('Error fetching characters:', error);
          return of({
            info: { count: 0, pages: 0, next: '', prev: '' },
            results: [],
          } as ApiResponse<Character>);
        })
      )
      .subscribe((data) => {
        this.updateCharacterData(data);
      });

    this.subscriptions.add(data$);
  }

  goToPage(numberPage: number) {
    if (numberPage === 1) {
      this.queryService.removeQueryParams([this.defaultParams[1]]);
    }
    this.queryService
      .updateQueryParam({ [this.defaultParams[1]]: numberPage })
      .then(() => {
        this.pageCurrent.set(numberPage);
        this.fetchCharacters();
      })
      .catch((error) => {
        console.error('Error navigating to page:', error);
      });
  }

  onImageLoad(item: any): void {
    item.loading = false;
  }

  searchCharacter(query: string) {
    this.searchTerm = query;

    // If the search term is empty, remove the query parameters
    if (!query.trim()) {
      this.queryService
        .removeQueryParams(this.defaultParams)
        .then(() => {
          this.searchTerm = '';
          this.pageCurrent.set(1);
          this.fetchCharacters();
        })
        .catch((error) => {
          console.error('Error al eliminar parámetros:', error);
        });
      return;
    } else {
      this.pageCurrent.set(1); // Reset the current page to 1
      this.queryService
        .updateQueryParam({ page: 1, name: query })
        .then(() => {
          this.fetchCharacters();
        })
        .catch((error) => {
          console.error('Error searching character:', error);
        });
    }
  }

  private updateCharacterData(data: ApiResponse<Character>) {
    this.info = data.info;
    this.characters$ = of({
      info: this.info,
      results: setCharactersWithLoading(data.results),
    });
    this.listPages = Array.from({ length: this.info.pages }, (_, i) => i + 1);
    this.errorSearch = false;
  }
}
