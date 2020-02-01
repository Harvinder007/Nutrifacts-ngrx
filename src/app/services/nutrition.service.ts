import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Food } from '../models/food.model';
import { SearchResult } from '../models/search-result.model';

@Injectable()
export class NutritionService {
    apiKey: string;

    constructor(http: HttpClient) {
        this.apiKey = '';
    }
}