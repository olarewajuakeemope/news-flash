import { EventEmitter } from 'events';
import dispatcher from '../dispatcher/Dispatcher';

/**
 * This Store contains data about the status of this app e.g whether it's
 * loading news articles, has finished loading them etc.
 * @extends EventEmitter
 */
class AppStatusStore extends EventEmitter {
  /**
   * Reacts to any Action that's of interest.
   * @param {Action} action - A new Action, containing the ActionType and
   * other data.
   */
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
