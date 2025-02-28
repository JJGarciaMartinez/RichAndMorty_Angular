import { Component } from '@angular/core';
import { RickAndMortyService } from '@services/rick-n-morty.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '@pagination/pagination.component';

@Component({
  selector: 'app-character-list',
  imports: [RouterModule, CommonModule, PaginationComponent],
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

  constructor(
    private rickAndMortyService: RickAndMortyService,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.fetchCharacters();

    const getQueryParams = this.router.parseUrl(this.router.url).queryParams;
    if (+getQueryParams['page'] && +getQueryParams['page'] <= this.info.pages) {
      await this.fetchPage(+getQueryParams['page']);
    }
  }

  // Function to fetch characters by page when the user requests a specific page
  async fetchPage(pageQuery: number) {
    this.isLoading = true;
    this.rickAndMortyService
      .getCharactersByPage(pageQuery)
      .subscribe((data) => {
        this.characters = data.results;
        this.info = data.info;
        this.listPages = Array.from(
          { length: this.info.pages },
          (_, i) => i + 1
        );
      });
    this.isLoading = false;

    this.pageCurrent = pageQuery;
  }

  // Get all characters from the API
  async fetchCharacters() {
    this.isLoading = true;
    try {
      const data = await this.rickAndMortyService.getCharacters().toPromise();
      this.characters = data.results;
      this.info = data.info;
      this.listPages = Array.from({ length: this.info.pages }, (_, i) => i + 1);
    } catch (error) {
      console.error('Error fetching characters:', error);
    } finally {
      this.isLoading = false;
    }
  }

  // Function to handle the page change event
  goToPage(page: number) {
    this.rickAndMortyService.getCharactersByPage(page).subscribe((data) => {
      this.characters = data.results;
      this.info = data.info;
    });

    this.pageCurrent = page;
    this.setUrlPage(page);
  }

  // Function to set the URL page
  setUrlPage(page: number) {
    const url = this.router.createUrlTree(['/characters'], {
      queryParams: { page },
    });

    this.router.navigateByUrl(url);
  }
}
