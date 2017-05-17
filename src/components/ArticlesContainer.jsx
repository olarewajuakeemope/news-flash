import React from 'react';
import Article from './Article';
import articlesStore from '../stores/ArticlesStore';
import WelcomeMessage from './WelcomeMessage';
import AppStatus from './AppStatus';

/**
 * This Component houses a list of Article's for easy reading.
 * @extends React.Component
 */
export default class ArticlesContainer extends React.Component {
  /**
   * Initializes this Component e.g sets the initial list of articles to zero,
   * adds listeners for changes in a Store etc.
   * @constructor
   */
  constructor() {
    super();

    this.state = {
      articles: articlesStore.getArticles(),
    };

    articlesStore.on('articlesFetched', () => {
      this.setState({
        articles: articlesStore.getArticles(),
      });
    });
  }


  /**
   * Computes and returns a representation of this Component for rendering.
   * @return {ReactComponent|null|false} - A Component for DOM rendering.
   * Otherwise, return null or false to prevent the rendering of this Component.
   */
  render() {
    const Articles = this.state.articles.map(article =>
      <Article key={article.id} {...article} />);
    return (
      <div id="articles-container" className="row container-fluid">
        <WelcomeMessage />
        <AppStatus />
        <div>{Articles}</div>
      </div>
    );
  }
}
