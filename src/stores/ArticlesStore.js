import { EventEmitter } from 'events';
import uuid from 'uuid';
import dispatcher from '../dispatcher/Dispatcher';


class ArticlesStore extends EventEmitter {

  constructor() {
    super();
    this.articles = [];
  }


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

  getArticles() {
    return this.articles;
  }
}

const articleStore = new ArticlesStore();
dispatcher.register(articleStore.handleAction.bind(articleStore));

export default articleStore;
