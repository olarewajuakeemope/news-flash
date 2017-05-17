import { EventEmitter } from 'events';
import dispatcher from '../dispatcher/Dispatcher';


class WelcomeMessageStore extends EventEmitter {

  constructor() {
    super();
    this.htmlClasses = [];
  }


  handleAction(action) {
    if (action.type === 'FETCH_ARTICLES') {
      this.htmlClasses = ['row', 'hidden'];
      this.emit('articlesFetched');
    }
  }

 
  getHtmlClasses() {
    return this.htmlClasses;
  }
}

const welcomeMessageStore = new WelcomeMessageStore();
dispatcher.register(welcomeMessageStore.handleAction.bind(welcomeMessageStore));

export default welcomeMessageStore;
