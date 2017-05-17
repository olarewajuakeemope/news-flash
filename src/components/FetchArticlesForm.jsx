import React from 'react';
import uuid from 'uuid';
import SearchSources from './SearchSources';
import * as ArticlesActions from '../actions/ArticlesActions';
import dashboardStore from '../stores/DashboardStore';


/**
 * A Component with a form that a user can use to search for or select
 * the news source and sort type that he/she wants to read.
 * @extends React.Component
 */
export default class FetchArticlesFormContainer extends React.Component {
  /**
   * Initializes this Component e.g sets the list of news sources to an
   * empty Array, adds listeners for pertinent Store's etc.
   * @constructor
   */
  constructor() {
    super();

    this.state = {
      sourceId: '',
      newsSources: [],
      sortBy: '',
      sortOptions: [],
      isSelectSortDisabled: true,
      isFetchArticlesBtnDisabled: true,
    };

    this.handleChangeNewsSource = this.handleChangeNewsSource.bind(this);
    this.handleChangeSort = this.handleChangeSort.bind(this);
    this.handleFetchArticles = this.handleFetchArticles.bind(this);

    dashboardStore.on('sourcesFetched', () => {
      this.setState(() => {
        const sources = dashboardStore.getSources();
        const firstSourceId = sources[0].id;
        const availableSorts = dashboardStore.getSorts(firstSourceId);
        const newState = {
          sourceId: firstSourceId,
          newsSources: sources,
          sortBy: availableSorts[0],
          sortOptions: availableSorts,
          isSelectSortDisabled: false,
          isFetchArticlesBtnDisabled: false,
        };

        return newState;
      });
    });

    dashboardStore.on('changeNewsSource', () => {
      this.setState(() => {
        const newSourceId = dashboardStore.getCurrentSource();
        const availableSorts = dashboardStore.getSorts(newSourceId);

        if (availableSorts === undefined) {
          return {};
        }

        const newState = {
          sourceId: newSourceId,
          sortBy: availableSorts[0],
          sortOptions: availableSorts,
          isSelectSortDisabled: false,
          isFetchArticlesBtnDisabled: false,
        };

        return newState;
      });
    });

    dashboardStore.on('fetchArticles', () => {
      this.setState({
        isFetchArticlesBtnDisabled: true,
      });
    });

    const finishFetch = () => {
      this.setState({
        isFetchArticlesBtnDisabled: false,
      });
    };

    dashboardStore.on('articlesFetched', () => {
      finishFetch();
    });

    dashboardStore.on('fetchArticlesFailed', () => {
      finishFetch();
    });
  }

  /**
   * This fires an Action when a user chooses a different news source from
   * this Component's dropdown menu.
   * @param {SyntheticEvent} event - An object with data about the event e.g
   * the DOM element on which it happened.
   */
  handleChangeNewsSource(event) {
    const sourceId = event.target.value;
    this.state.sourceId = sourceId;
    ArticlesActions.changeNewsSource(sourceId);
  }

  /**
   * This fires an Action when a user chooses a new sort type from
   * this Component's dropdown menu.
   * @param {SyntheticEvent} event - An object with data about the event e.g
   * the DOM element on which it happened.
   */
  handleChangeSort(event) {
    const sortBy = event.target.value;
    this.state.sortBy = sortBy;
    ArticlesActions.changeSort(sortBy);
  }

  /**
   * This helps fire an Action when a user clicks the button for fetching
   * more news articles.
   */
  handleFetchArticles() {
    ArticlesActions.fetchArticles(this.state.sourceId, this.state.sortBy);
  }

  /**
   * Computes and returns a representation of this Component for rendering.
   * @return {ReactComponent|null|false} - A Component for DOM rendering.
   * Otherwise, return null or false to prevent the rendering of this Component.
   */
  render() {
    const newsSourcesOptions = this.state.newsSources.map(source =>
      <option
        key={uuid.v4()}
        value={source.id}
      >
        {source.name}
      </option>);

    const sortOptions = this.state.sortOptions.map(oneSort =>
      <option
        key={uuid.v4()}
        value={oneSort}
      >
        {oneSort[0].toUpperCase() + oneSort.substr(1)}
      </option>,
    );

    return (
      <div id="fetch-articles-form" className="col-md-12">
        <div id="search-sources-container" className="col-xs-4">
          <SearchSources />
        </div>
        <div id="choose-news-source-container" className="col-xs-4">
          <select
            id="choose-news-source"
            className="form-control"
            value={this.state.sourceId}
            onChange={this.handleChangeNewsSource}
          >
            {newsSourcesOptions}
          </select>
        </div>
        <div id="choose-sort-container" className="col-xs-2">
          <select
            id="choose-sort"
            className="form-control"
            onChange={this.handleChangeSort}
          >
            {sortOptions}
          </select>
        </div>
        <div id="fetch-articles-btn-container" className="col-xs-2">
          <button
            id="fetch-articles-btn" className="btn btn-primary"
            onClick={this.handleFetchArticles}
          >
          Get News
          </button>
        </div>
      </div>
    );
  }
}
