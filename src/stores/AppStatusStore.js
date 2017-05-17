import { EventEmitter } from 'events';
import dispatcher from '../dispatcher/Dispatcher';


class AppStatusStore extends EventEmitter {

  handleAction(action) {
    switch (action.type) {
      case 'FETCH_ARTICLES':
        this.emit('fetchArticles');
        break;

      case 'ARTICLES_FETCHED':
        this.emit('articlesFetched');
        break;

      default:
        // Do nothing.
    }
  }
}

const appStatusStore = new AppStatusStore();
dispatcher.register(appStatusStore.handleAction.bind(appStatusStore));
export default appStatusStore;
