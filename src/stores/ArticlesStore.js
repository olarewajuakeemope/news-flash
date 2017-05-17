import { EventEmitter } from 'events';
import uuid from 'uuid';
import dispatcher from '../dispatcher/Dispatcher';

/**
 * This Store contains the news articles that have been retrieved.
 * @extends EventEmitter
 */
class ArticlesStore extends EventEmitter {
  /**
   * Initializes this Store with various properties, most especially the
   * list of news articles currently available for reading.
   * @constructor
   */
  constructor() {
    super();
    this.articles = [];
  }

  /**
   * Reacts to any Action that's of interest, most especially one for when
   * a new batch of news articles has been retrieved.
   * @param {Action} action - A new Action, containing the ActionType and
   * other data.
   * @return {void}
   */
  handleAction(action) {
    if (action.type === 'ARTICLES_FETCHED') {
      const articles = action.data.articles.map(article => ({
        id: uuid.v4(),
        title: article.title,
        description: article.description,
        url: article.url,
        imageUrl: article.urlToImage,
        author: article.author,
        publishedAt: article.publishedAt,
      }));
      this.articles = articles;
      this.emit('articlesFetched');
    }
  }

  /**
   * @return {Array} articles - An array of objects that represent each article.
   */
  getArticles() {
    return this.articles;
  }
}

const articleStore = new ArticlesStore();
dispatcher.register(articleStore.handleAction.bind(articleStore));

export default articleStore;
