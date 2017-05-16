import { EventEmitter } from 'events';
import dispatcher from '../dispatcher/Dispatcher';


class DashboardStore extends EventEmitter {

  constructor() {
    super();
    this.sources = [];
    this.currentSource = '';
    this.sorts = {};
    this.message = '';
  }


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


  getSources() {
    return this.sources;
  }

 
  getSorts(sourceId) {
    return this.sorts[sourceId];
  }


  getCurrentSource() {
    return this.currentSource;
  }
}

const dashboardStore = new DashboardStore();
dispatcher.register(dashboardStore.handleAction.bind(dashboardStore));

export default dashboardStore;
