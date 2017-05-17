import axios from 'axios';
import dotenv from 'dotenv';
import dispatcher from '../dispatcher/Dispatcher';
import * as firebase from 'firebase';

dotenv.config();

/**
 * Broadcasts an Action when an attempt to retrieve news articles fails. The
 * Action has a payload with details about the error.
 * @param {Error} error - Data about the error that occurred e.g an error message.
 */
export function fetchArticlesFailed(error) {
  dispatcher.dispatch({
    type: 'FETCH_ARTICLES_FAILED',
    message: 'Failed to load news articles. Please try again.',
    cause: error.message,
  });
}

/**
 * Broadcasts an Action when a fresh batch of news articles has been
 * successfully retrieved. The retrieved articles and other metadata
 * are part of the Action's payload.
 * @param {HTTPResponse} response - An Object that contains the retrieved
 * articles and other metadata about the retrieval.
 */
export function articlesFetched(response) {
  const data = response.data;
  dispatcher.dispatch({
    type: 'ARTICLES_FETCHED',
    data,
  });
}


export function setFavourite(id, title, description, url, imageUrl, author, publishedAt) {
  let userId = firebase.auth().currentUser.uid;
  let newPostKey = firebase.database().ref('favourites').child(userId).push().key;
  firebase.database().ref('favourites/' + userId + '/' + newPostKey).update({
    id, title, description, url, urlToImage: imageUrl, author, publishedAt
  });
}



export function getFavorites() {
    let data = {};
    let userId = firebase.auth().currentUser.uid;
    let articlesArray = [];

    firebase.database().ref('/favourites/' + userId).once('value').then((snapshot) => {
      var articles = snapshot.val();
        Object.keys(articles).forEach((postId) => {
        var post = articles[postId];
        articlesArray.push(post);
      });
    
    data.articles = articlesArray;
    dispatcher.dispatch({
      type: 'ARTICLES_FETCHED',
      data: data,
    });

   }).catch(console.log('cant fetch users favourites'));

}


/**
 * Broadcasts an Action that fetching fresh news articles has started. Then,
 * it calls [articlesFetched()]{@link articlesFetched} or
 * [fetchArticlesFailed()]{@link fetchArticlesFailed} based on the success
 * or failure respectively of the fetch attempt.
 * @param {String} sourceId - The ID of the news source desired e.g al-jazeera,
 * bbc etc.
 * @param {String} sort - The sort type of the articles to retrieve e.g latest,
 * top etc.
 */
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

/**
 * Broadcasts an Action that the news source ID in use by this app has changed.
 * For example, if it was 'al-jazeera', this function can change it to 'bbc'.
 * @param {String} newsSourceId - the ID of the new news source.
 */
export function changeNewsSource(newsSourceId) {
  dispatcher.dispatch({
    type: 'CHANGE_NEWS_SOURCE',
    sourceId: newsSourceId,
  });
}

/**
 * Broadcasts an Action that changes the sort type in use by
 * this app. For example, if it was 'top', this function can
 * change it to 'latest'.
 * @param {String} sort - the new sort type.
 */
export function changeSort(sort) {
  dispatcher.dispatch({
    type: 'CHANGE_SORT',
    sort,
  });
}

/**
 * Broadcasts an Action when this app has successfully updated its list
 * of news sources and the sort types available for each of them. The retrieved
 * news sources, their individual sort types and other metadata are part 
 * of the Action's payload.
 * @param {HTTPResponse} response: An Object that contains data about the
 * retrieved news sources, their sort types and other metadata about the
 * retrieval.
 */
export function sourcesFetched(response) {
  dispatcher.dispatch({
    type: 'SOURCES_FETCHED',
    data: response.data,
  });
}

/**
 * Broadcasts an Action when an attempt to update this app's list of news
 * sources fails.
 */
export function fetchSourcesFailed() {
  dispatcher.dispatch({
    type: 'FETCH_SOURCES_FAILED',
    message: 'Ooops! Update failed. Please check your internet connection and try again.',
  });
}

/**
 * Broadcasts an Action that an update to this app's list of news sources
 * has started. Then, it calls [sourcesFetched()]{@link sourcesFetched} or
 * [fetchSourcesFailed()]{@link fetchSourcesFailed} based on the success
 * or failure respectively of that attempt.
 */
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
