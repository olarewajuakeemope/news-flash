import chai from 'chai';
import sinon from 'sinon';
import * as ArticlesActions from '../../actions/ArticlesActions';
import dispatcher from '../../dispatcher/Dispatcher';

const expect = chai.expect;
const sortBy = 'top';
const changeSort = ArticlesActions.changeSort;

describe('changeSort', () => {
  it('should be a defined Action', () => {
    expect(changeSort).to.not.equal(undefined);
  });

  const spy = sinon.spy();
  dispatcher.register(spy);
  changeSort(sortBy);
  it('should successfully dispatch an appropriate Action', () => {
    expect(spy.called).to.equal(true);
  });

  it('should dispatch an Action with the right payload', () => {
    const payload = {
      type: 'CHANGE_SORT',
      sort: sortBy,
    };
    expect(spy.calledWithExactly(payload)).to.equal(true);
  });
});
