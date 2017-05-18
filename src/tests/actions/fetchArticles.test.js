import chai from 'chai';
import sinon from 'sinon';
import * as ArticlesActions from '../../actions/ArticlesActions';
import dispatcher from '../../dispatcher/Dispatcher';

const expect = chai.expect;
const sourceId = 'cnn';
const sortBy = 'top';
const fetchArticles = ArticlesActions.fetchArticles;

describe('fetchArticles', () => {
  it('should be a defined Action', () => {
    expect(fetchArticles).to.not.equal(undefined);
  });

  const spy = sinon.spy();
  dispatcher.register(spy);
  fetchArticles(sourceId, sortBy);
  it('should successfully dispatch an appropriate Action', () => {
    expect(spy.called).to.equal(true);
  });

  it('should dispatch an Action with the right payload', () => {
    const payload = {
      type: 'FETCH_ARTICLES',
      message: 'Fetching articles... Please wait...',
      sourceId,
      sort: sortBy,
    };
    expect(spy.calledWithExactly(payload)).to.equal(true);
  });
});
