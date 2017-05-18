import chai from 'chai';
import sinon from 'sinon';
import * as ArticlesActions from '../../actions/ArticlesActions';
import dispatcher from '../../dispatcher/Dispatcher';

const expect = chai.expect;
const sourcesFetched = ArticlesActions.sourcesFetched;

describe('sourcesFetched', () => {
  it('should be a defined Action', () => {
    expect(sourcesFetched).to.not.equal(undefined);
  });

  const spy = sinon.spy();
  dispatcher.register(spy);
  const mockApiResponse = {
    data: {
      sources: [
        {
          name: 'CNN',
          id: 'cnn',
        },
        {
          name: 'ESPN',
          id: 'espn',
        },
      ],
    },
  };
  sourcesFetched(mockApiResponse);
  it('should successfully dispatch an appropriate Action', () => {
    expect(spy.called).to.equal(true);
  });

  it('should dispatch an Action with the right payload', () => {
    const payload = {
      type: 'SOURCES_FETCHED',
      data: mockApiResponse.data,
    };
    expect(spy.calledWithExactly(payload)).to.equal(true);
  });
});
