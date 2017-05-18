import chai from 'chai';
import sinon from 'sinon';
import * as ArticlesActions from '../../actions/ArticlesActions';
import dispatcher from '../../dispatcher/Dispatcher';

const expect = chai.expect;
const fetchSourcesFailed = ArticlesActions.fetchSourcesFailed;

describe('fetchSourcesFailed', () => {
  it('should be a defined Action', () => {
    expect(fetchSourcesFailed).to.not.equal(undefined);
  });

  const spy = sinon.spy();
  dispatcher.register(spy);
  fetchSourcesFailed();
  it('should successfully dispatch an appropriate Action', () => {
    expect(spy.called).to.equal(true);
  });

  it('should dispatch an Action with the right payload', () => {
    const payload = {
      type: 'FETCH_SOURCES_FAILED',
      message: 'Ooops! Update failed. Please check your internet connection and try again.',
    };
    expect(spy.calledWithExactly(payload)).to.equal(true);
  });
});
