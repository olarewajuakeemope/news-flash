import chai from 'chai';
import sinon from 'sinon';
import * as ArticlesActions from '../../actions/ArticlesActions';
import dispatcher from '../../dispatcher/Dispatcher';

const expect = chai.expect;
const fetchArticlesFailed = ArticlesActions.fetchArticlesFailed;

describe('fetchArticlesFailed', () => {
  it('should be a defined Action', () => {
    expect(fetchArticlesFailed).to.not.equal(undefined);
  });

  const spy = sinon.spy();
  dispatcher.register(spy);
  const error = {
    message: 'Network error',
  };
  fetchArticlesFailed(error);
  it('should successfully dispatch an appropriate Action', () => {
    expect(spy.called).to.equal(true);
  });

  it('should dispatch an Action with the right payload', () => {
    const payload = {
      type: 'FETCH_ARTICLES_FAILED',
      message: 'Failed to load news articles. Please try again.',
      cause: error.message,
    };
    expect(spy.calledWithExactly(payload)).to.equal(true);
  });
});
