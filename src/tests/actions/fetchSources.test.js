import chai from 'chai';
import sinon from 'sinon';
import * as ArticlesActions from '../../actions/ArticlesActions';
import dispatcher from '../../dispatcher/Dispatcher';

const expect = chai.expect;
const fetchSources = ArticlesActions.fetchSources;

describe('fetchSources', () => {
  it('should be a defined Action', () => {
    expect(fetchSources).to.not.equal(undefined);
  });

  const spy = sinon.spy();
  dispatcher.register(spy);
  fetchSources();
  it('should successfully dispatch an appropriate Action', () => {
    expect(spy.called).to.equal(true);
  });

  it('should dispatch an Action with the right payload', () => {
    const payload = {
      type: 'FETCH_SOURCES',
      message: 'We\'re updating our list of news sources... Please wait...',
    };
    expect(spy.calledWithExactly(payload)).to.equal(true);
  });
});
