import chai from 'chai';
import sinon from 'sinon';
import * as ArticlesActions from '../../actions/ArticlesActions';
import dispatcher from '../../dispatcher/Dispatcher';

const expect = chai.expect;
const articlesFetched = ArticlesActions.articlesFetched;

describe('articlesFetched', () => {
  it('should be a defined Action', () => {
    expect(articlesFetched).to.not.equal(undefined);
  });

  const spy = sinon.spy();
  dispatcher.register(spy);
  const mockApiResponse = {
    data: {
      status: 'ok',
      source: 'cnn',
      sortBy: 'top',
      articles: [
        {
          author: 'Frank Pallotta',
          title: 'FCC is reviewing complaints about Colbert\'s Trump jokes. But that\'s its job',
          description: 'The FCC is reviewing complaints about Stephen Colbert\'s comments about President Trump on Monday night that some found to be offensive.',
          url: 'http://money.cnn.com/2017/05/05/media/stephen-colbert-donald-trump-fcc/index.html',
          urlToImage: 'http://i2.cdn.turner.com/money/dam/assets/151117083530-stephen-colbert-late-show-desk-780x439.jpg',
          publishedAt: '2017-05-05T09:41:36Z',
        },
        {
          author: 'Robert Mclean',
          title: 'Colbert mocks House Republicans after American Health Care Act passes',
          description: 'Stephen Colbert took House Republicans to task Thursday on \'The Late Show\' for passing legislation to replace Obamacare.',
          url: 'http://money.cnn.com/2017/05/05/media/colbert-gop-american-health-care-act/index.html',
          urlToImage: 'http://i2.cdn.turner.com/money/dam/assets/151117153751-stephen-colbert-late-show-standing-780x439.jpg',
          publishedAt: '2017-05-05T12:58:22Z',
        },
      ],
    },
  };
  articlesFetched(mockApiResponse);
  it('should successfully dispatch an appropriate Action', () => {
    expect(spy.called).to.equal(true);
  });

  it('should dispatch an Action with the right payload', () => {
    const payload = {
      type: 'ARTICLES_FETCHED',
      data: mockApiResponse.data,
    };
    expect(spy.calledWithExactly(payload)).to.equal(true);
  });
});
