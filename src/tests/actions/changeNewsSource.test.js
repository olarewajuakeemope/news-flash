import chai from 'chai';
import sinon from 'sinon';
import * as ArticlesActions from '../../actions/ArticlesActions';
import dispatcher from '../../dispatcher/Dispatcher';

const expect = chai.expect;
const sourceId = 'cnn';
const sortBy = 'top';
const changeNewsSource = ArticlesActions.changeNewsSource;

describe('changeNewsSource', () => {
  it('should be a defined Action', () => {
    expect(changeNewsSource).to.not.equal(undefined);
  });

  const spy = sinon.spy();
  dispatcher.register(spy);
  changeNewsSource(sourceId, sortBy);
  it('should successfully dispatch an appropriate Action', () => {
    expect(spy.called).to.equal(true);
  });

  it('should dispatch an Action with the right payload', () => {
    const payload = {
      type: 'CHANGE_NEWS_SOURCE',
      sourceId,
    };
    expect(spy.calledWithExactly(payload)).to.equal(true);
  });
});