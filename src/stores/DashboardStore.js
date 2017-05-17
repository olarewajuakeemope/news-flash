import { EventEmitter } from 'events';
import dispatcher from '../dispatcher/Dispatcher';

/**
 * This Store contains data about the news sources and their sort types
 * currently in use by this app and other metadata.
 * @extends EventEmitter
 */
class DashboardStore extends EventEmitter {
  /**
   * Initializes this Store with some properties, most especially the
   * list of sources, the sort types available for each of them and the default
   * news source.
   * @constructor
   */
  constructor() {
    super();
    this.sources = [];
    this.currentSource = '';
    this.sorts = {};
    this.message = '';
  }

  /**
   * Reacts to any Action that's of interest e.g when this app is busy fetching
   * news articles, when either the news source or sort type is changed etc.
   * @param {Action} action - A new Action, containing Action.type and
   * other data.
   * @return {void}
   */
  handleAction(action) {
    switch (action.type) {
      case 'SOURCES_FETCHED': {
        const fetchedSources = action.data.sources;
        const sources = [];
        const sorts = {};
        for (let i = 0; i < fetchedSources.length; i += 1) {
          const source = fetchedSources[i];
          sources.push({
            id: source.id,
            name: source.name,
          });
          sorts[source.id] = source.sortBysAvailable;
        }

        this.sources = sources;
        this.sorts = sorts;
        this.emit('sourcesFetched');
        break;
      }

      case 'FETCH_SOURCES_FAILED':
        this.message = action.message;
        this.emit('fetchSourcesFailed');
        break;

      case 'CHANGE_NEWS_SOURCE':
        this.currentSource = action.sourceId;
        this.emit('changeNewsSource');
        break;

      case 'CHANGE_SORT':
        this.emit('changeSort');
        break;

      case 'FETCH_ARTICLES':
        this.emit('fetchArticles');
        break;

      case 'FETCH_ARTICLES_FAILED':
        this.emit('fetchArticlesFailed');
        break;

      case 'ARTICLES_FETCHED':
        this.emit('articlesFetched');
        break;

      default:
        // Do nothing.
    }
  }

  /**
   * @return {Array} - Return an Array of Objects that represent the news
   * sources currently available in this Store.
   */
  getSources() {
    return this.sources;
  }

  /**
   * @param {String} sourceId - The ID of the news source whose available sort
   * types need to be known.
   * @return {Array} - The sort types available for the the given sourceId.
   */
  getSorts(sourceId) {
    return this.sorts[sourceId];
  }

  /**
   * @return {String} - The ID of the news source currently being used
   * in this Store.
   */
  getCurrentSource() {
    return this.currentSource;
  }
}

const dashboardStore = new DashboardStore();
dispatcher.register(dashboardStore.handleAction.bind(dashboardStore));

export default dashboardStore;
