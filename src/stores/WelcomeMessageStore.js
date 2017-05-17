import { EventEmitter } from 'events';
import dispatcher from '../dispatcher/Dispatcher';

/**
 * This Store contains data about the status of the WelcomeMessage Component.
 * @extends EventEmitter
 */
class WelcomeMessageStore extends EventEmitter {
  /**
   * Initializes this Store with some properties, most especially a
   * list of CSS classes to apply to this Component when it is rendered.
   * @constructor
   */
  constructor() {
    super();
    this.htmlClasses = [];
  }

  /**
   * Reacts to any Action that's of interest, especially when the first batch
   * of news articles is loaded.
   * @param {Action} action - A new Action, containing Action.type and
   * other data.
   * @return {void}
   */
  handleAction(action) {
    if (action.type === 'FETCH_ARTICLES') {
      this.htmlClasses = ['row', 'hidden'];
      this.emit('articlesFetched');
    }
  }

  /**
   * @return {Array} - The CSS classes to be applied to this Component when
   * it is rendered.
   */
  getHtmlClasses() {
    return this.htmlClasses;
  }
}

const welcomeMessageStore = new WelcomeMessageStore();
dispatcher.register(welcomeMessageStore.handleAction.bind(welcomeMessageStore));

export default welcomeMessageStore;
