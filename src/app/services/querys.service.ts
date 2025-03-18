import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { filterNoEmptyParams } from '@utils/helper';

@Injectable({
  providedIn: 'root',
})
export class QuerysService {
  constructor(private router: Router, private route: ActivatedRoute) {}

  getCurrentQueryParams(): Params {
    // snapshot is a property that returns the current state of the route
    return this.route.snapshot.queryParams;
  }

  updateQueryParam(newParam: Params): Promise<boolean> {
    const mergedParams = {
      ...this.getCurrentQueryParams(),
      ...newParam,
    };

    return this.router.navigate([], {
      relativeTo: this.route,
      queryParams: filterNoEmptyParams(mergedParams),
      queryParamsHandling: 'merge',
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

  //! Apartir de aqui se encuentra el antiguo código (se requiere refactorización en el resto del proyecto)
  async addQueryParams(params: { [key: string]: string }): Promise<void> {
    let queryParams = new HttpParams();
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        queryParams = queryParams.set(key, params[key]);
      }
    }

    const urlTree = this.router.createUrlTree([], {
      relativeTo: this.route,
      queryParams: queryParams
        .keys()
        .reduce((acc: { [key: string]: string | null }, key: string) => {
          acc[key] = queryParams.get(key);
          return acc; // acc = accumulator (acumulador) to store the values
        }, {}),
      queryParamsHandling: 'merge',
    });

    this.router.navigateByUrl(urlTree);
  }

  async clearQueryParams(params: string[]): Promise<void> {
    const queryParams = params.reduce(
      (acc: { [key: string]: string | null }, key: string) => {
        acc[key] = null;
        return acc; // acc = accumulator (acumulador) to store the values
      },
      {}
    );

    const urlTree = this.router.createUrlTree([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge',
    });

    this.router.navigateByUrl(urlTree);
  }

  getQueryParams(): { [key: string]: string } {
    return this.router.parseUrl(this.router.url).queryParams;
  }
}
