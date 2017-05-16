
import axios from 'axios';
import dotenv from 'dotenv';
import dispatcher from '../dispatcher/Dispatcher';

dotenv.config();


export function fetchArticlesFailed(error) {
  dispatcher.dispatch({
    type: 'FETCH_ARTICLES_FAILED',
    message: 'Failed to load news articles. Please try again.',
    cause: error.message,
  });
}


export function articlesFetched(response) {
  const data = response.data;
  dispatcher.dispatch({
    type: 'ARTICLES_FETCHED',
    data,
  });
}


export function fetchArticles(sourceId, sort) {
  dispatcher.dispatch({
    type: 'FETCH_ARTICLES',
    message: 'Fetching articles... Please wait...',
    sourceId,
    sort,
  });

  const url = `https://newsapi.org/v1/articles?source=${sourceId}&sortBy=${sort}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`;
  axios.get(url)
    .then((response) => {
      articlesFetched(response);
    })
    .catch((error) => {
      fetchArticlesFailed(error);
    });
}


export function changeNewsSource(newsSourceId) {
  dispatcher.dispatch({
    type: 'CHANGE_NEWS_SOURCE',
    sourceId: newsSourceId,
  });
}


export function changeSort(sort) {
  dispatcher.dispatch({
    type: 'CHANGE_SORT',
    sort,
  });
}


export function sourcesFetched(response) {
  dispatcher.dispatch({
    type: 'SOURCES_FETCHED',
    data: response.data,
  });
}


export function fetchSourcesFailed() {
  dispatcher.dispatch({
    type: 'FETCH_SOURCES_FAILED',
    message: 'Ooops! Update failed. Please check your internet connection and try again.',
  });
}


export function fetchSources() {
  dispatcher.dispatch({
    type: 'FETCH_SOURCES',
    message: 'We\'re updating our list of news sources... Please wait...',
  });

  const sourcesUrl = 'https://newsapi.org/v1/sources?language=en';
  axios.get(sourcesUrl)
    .then((response) => {
      sourcesFetched(response);
    })
    .catch(() => {
      fetchSourcesFailed();
    });
}
