import axios from 'axios';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor() { }

  getNews() {
    return axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=29284cfd56cd4afba764c1d89308c7bc');
  }

}
