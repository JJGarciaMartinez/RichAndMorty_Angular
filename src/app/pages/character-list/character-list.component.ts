import { Component } from '@angular/core';
import { RickAndMortyService } from '@services/rick-n-morty.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '@components/pagination/pagination.component';
import { SpinnerComponent, TooltipDirective } from '@coreui/angular';
import { IconComponent } from '@components/icon/icon.component';
import { SearchBarComponent } from '@components/search-bar/search-bar.component';
import { QuerysService } from '@services/querys.service';

@Component({
  selector: 'app-character-list',
  imports: [
    RouterModule,
    CommonModule,
    PaginationComponent,
    SpinnerComponent,
    IconComponent,
    TooltipDirective,
    SearchBarComponent,
  ],
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.css',
})
export class CharacterListComponent {
  characters: any = [];
  info: any = {
    count: 0,
    pages: 1,
    next: '',
    prev: '',
    page: 1,
  };
  pageCurrent = 1;
  listPages: number[] = [];
  isLoading = false;
  searchTerm: string = ''; // Variable to store the search term
  errorSearch: boolean = false;

  constructor(
    private rickAndMortyService: RickAndMortyService,
    private queryService: QuerysService
  ) {}

  async ngOnInit() {
    await this.fetchCharacters();

    const getQueryParams = this.queryService.getQueryParams();

    if (getQueryParams['search']) {
      await this.searchCharacter(getQueryParams['search']);
      this.searchTerm = getQueryParams['search'];
    }

    if (+getQueryParams['page'] && +getQueryParams['page'] <= this.info.pages) {
      await this.goToPage(+getQueryParams['page']);
    }
  }

  async fetchCharacters() {
    this.isLoading = true;
    try {
      const data = await this.rickAndMortyService.getCharacters().toPromise();
      this.updateCharacterData(data);
    } catch (error) {
      this.handleError(error);
    } finally {
      this.isLoading = false;
    }
  }

  async goToPage(page: number) {
    this.isLoading = true;
    try {
      const data = this.searchTerm
        ? await this.rickAndMortyService
            .getCharacterByName(this.searchTerm, page)
            .toPromise()
        : await this.rickAndMortyService.getCharactersByPage(page).toPromise();
      this.updateCharacterData(data);
    } catch (error) {
      this.handleError(error);
    } finally {
      this.isLoading = false;
    }
    this.pageCurrent = page;
    this.setUrlPage(page);
  }

  async setUrlPage(page: number) {
    const queryParams: any = { page };
    if (this.searchTerm) {
      queryParams.search = this.searchTerm;
    }
    await this.queryService.addQueryParams(queryParams);

    if (page === 1) {
      await this.queryService.clearQueryParams(['page']);
    }
  }

  onImageLoad(item: any): void {
    item.loading = false;
  }

  async searchCharacter(name: string) {
    this.isLoading = true;
    this.searchTerm = name;
    try {
      const data = await this.rickAndMortyService
        .getCharacterByName(name)
        .toPromise();
      this.updateCharacterData(data);
    } catch (error) {
      this.handleError(error);
    } finally {
      this.isLoading = false;
      this.pageCurrent = 1;
      await this.setUrlPage(1);
    }
  }

  private updateCharacterData(data: any) {
    this.characters = data.results.map((character: any) => ({
      ...character,
      loading: true,
    }));
    this.info = data.info;
    this.listPages = Array.from({ length: this.info.pages }, (_, i) => i + 1);
    this.errorSearch = false;
  }

  private handleError(error: any) {
    this.errorSearch = true;
    return error;
    // console.error('Error fetching characters:', error);
  }
}
