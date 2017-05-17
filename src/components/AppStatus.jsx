import React from 'react';
import appStatusStore from '../stores/AppStatusStore';


export default class AppStatus extends React.Component {

  constructor() {
    super();

    this.state = {
      isFetching: false,
      isErrorFetch: false,
      isSuccessFetch: true,
    };

    appStatusStore.on('fetchArticles', () => {
      this.setState({
        isFetching: true,
        isErrorFetch: false,
        isSuccessFetch: false,
        message: 'Loading... Please wait...',
      });
    });

    appStatusStore.on('fetchArticlesFailed', () => {
      this.setState({
        isFetching: false,
        isErrorFetch: true,
        isSuccessFetch: false,
        message: 'Oops! Failed to fetch news articles. Please try again.',
      });
    });

    appStatusStore.on('articlesFetched', () => {
      this.setState({
        isFetching: false,
        isErrorFetch: false,
        isSuccessFetch: true,
      });
    });
  }

  render() {
    const showAppStatus = this.state.isSuccessFetch ? 'hidden' : '';
    const showLoadingImg = this.state.isFetching ? '' : 'hidden';
    const showErrorImg = this.state.isErrorFetch ? '' : 'hidden';
    const statusMsg = this.state.message || '';

    return (
      <div id="app-status-container" className={showAppStatus}>
        <img
          id="loading-articles"
          alt="Loading articles... Please wait..."
          className={`img-responsive center-block ${showLoadingImg}`}
          src="https://res.cloudinary.com/worldgeek/image/upload/v1493551216/loading-img_zqnq20.gif"
        />
        <img
          id="error-loading-articles"
          alt="Failed to load articles. Please try again."
          className={`img-responsive center-block ${showErrorImg}`}
          src="https://res.cloudinary.com/worldgeek/image/upload/v1493551216/error-loading-img_z8tzia.png"
        />
        <h3 className="text-center">{statusMsg}</h3>
      </div>
    );
  }
}
