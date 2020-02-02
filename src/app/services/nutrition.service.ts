import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import { Food } from '../models/food.model';
import { SearchResult } from '../models/search-result.model';

@Injectable()
export class NutritionService {
    apiKey: string;

    constructor(private http: HttpClient) {
        this.apiKey = '';
    }

    searchFood(query: string): Observable<SearchResult[]> {
        const url = '';
        const params: string = [
            'q=${query}',
            'sort=r',
            'max=25',
            'offset=0',
            'ds=Standard%20Reference',
            'api_key=${this.api_key}'
        ].join('&');

        const queryUrl = '${url}${params}';

        return this.http.get(queryUrl).pipe(
            map((response: Response) =>
            response.json().list ? response.json().list.item.map(item => {
              return new SearchResult(item);
            })
          : [])
          );
    }

    fetchFood(query: string): Observable<Food> {
        const url = 'https://api.nal.usda.gov/ndb/nutrients/?format=json&';
        const params: string = [
          `ndbno=${query}`,
          `nutrients=255`, // Water
          `nutrients=208`, // Energy
          `nutrients=203`, // Protein
          `nutrients=204`, // Total lipid
          `nutrients=205`, // Carbohydrate
          `nutrients=268`, // Energy
          `nutrients=269`, // Sugars
          `nutrients=291`, // Fiber
          `api_key=${this.apiKey}`
        ].join('&');

        const queryUrl = `${url}${params}`;

        return this.http.get(queryUrl).pipe(
        map(this.extractData)
        );
      }

      private extractData(res: Response): Food {
        const body = res.json().report.foods[0];
        return new Food(body);
      }
}
