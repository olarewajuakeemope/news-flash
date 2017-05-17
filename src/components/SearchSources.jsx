import lodash from 'lodash';
import React from 'react';
import { Search } from 'semantic-ui-react';
import dashboardStore from '../stores/DashboardStore';
import * as ArticlesActions from '../actions/ArticlesActions';

/**
 * This component enables a user to search for any news source and then select
 * the one she/he desires from the search results. When the user selects a
 * result, the news source ID and sort type in use by this app is updated.
 * @extends React.Component
 */
export default class SearchSources extends React.Component {
  /**
   * Initializes this component and binds some of its methods to this
   * instance of the class.
   * @constructor
   */
  constructor() {
    super();

    this.allResults = [];
    this.matchingResults = [];

    this.handleResultSelect = this.handleResultSelect.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  /**
   * Contains callbacks that update this Component whenever a Store it
   * depends on changes.
   */
  componentWillMount() {
    this.resetComponent();

    dashboardStore.on('sourcesFetched', () => {
      const sources = dashboardStore.getSources();
      this.state.allResults = sources.map(source => ({
        title: source.name,
        value: source.id,
      }));
    });
  }

  /**
   * Resets the search input element whenever the user doesn't supply any
   * query string for searching i.e when the input element is empty.
   */
  resetComponent() {
    this.setState({
      isLoading: false,
      value: '',
    });
  }

  /**
   * Updates the value in the search input element and fires the
   * changeNewsSource Action. Waits for 500ms before starting the
   * search so as avoid firing too many search queries, which might not be
   * completed in the order they were started.
   * @param {SyntheticEvent} event - Data about this event.
   * @param {Object} result - Data about the selected search result e.g
   * the id of the news source it represents.
   */
  handleResultSelect(event, result) {
    this.setState({ value: result.title });
    ArticlesActions.changeNewsSource(result.value);
  }

  /**
   * Updates the value in the search input element and fires the
   * changeNewsSource Action.
   * @param {SyntheticEvent} event - Data about this event.
   * @param {String} value - The query string to be searched on.
   */
  handleSearchChange(event, value) {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) {
        this.resetComponent();
        return;
      }

      const pattern = new RegExp(lodash.escapeRegExp(this.state.value), 'i');
      const isMatch = (result => pattern.test(result.title));

      this.setState({
        isLoading: false,
        matchingResults: lodash.filter(this.state.allResults, isMatch),
      });
    }, 500);
  }

  /**
   * Computes and returns a representation of this Component for rendering.
   * @return {ReactComponent|null|false} - A Component for DOM rendering.
   * Otherwise, return null or false to prevent the rendering of this Component.
   */
  render() {
    const { isLoading, value, matchingResults } = this.state;

    return (
      <Search
        loading={isLoading}
        fluid
        input="text"
        onResultSelect={this.handleResultSelect}
        onSearchChange={this.handleSearchChange}
        results={matchingResults}
        value={value}
        className="row row-full"
        {...this.props}
      />
    );
  }
}
