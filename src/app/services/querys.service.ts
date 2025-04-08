import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { filterNoEmptyParams } from '@utils/helper';
import { BehaviorSubject, filter, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuerysService {
  // BehaviorSubject para mantener estado de parámetros sincronizado
  private queryParamsSubject = new BehaviorSubject<Params>({});

  // Observable público para que los servicios se suscriban a cambios
  public queryParams$: Observable<Params> =
    this.queryParamsSubject.asObservable();

  constructor(private router: Router, private route: ActivatedRoute) {
    // Inicializar con los parámetros actuales
    this.queryParamsSubject.next(this.getCurrentQueryParams());

    // Escuchar cambios de navegación para mantener el estado actualizado
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.queryParamsSubject.next(this.getCurrentQueryParams());
      });
  }

  getCurrentQueryParams(): Params {
    return this.route.snapshot.queryParams;
  }

  getQueryParam(): { [key: string]: string } {
    return this.router.parseUrl(this.router.url).queryParams;
  }

  updateQueryParam(newParam: Params): Promise<boolean> {
    const mergedParams = {
      ...this.getCurrentQueryParams(),
      ...newParam,
    };

    return this.router.navigate([], {
      relativeTo: this.route,
      queryParams: filterNoEmptyParams(mergedParams), // filterNoEmptyParams is a helper function that removes the empty values from the object
    });
  }

  removeQueryParams(paramsToRemove: string[]): Promise<boolean> {
    const currentParams = { ...this.getCurrentQueryParams() };
    paramsToRemove.forEach((param) => delete currentParams[param]);

    return this.router.navigate([], {
      relativeTo: this.route,
      queryParams: currentParams,
    });
  }
}
