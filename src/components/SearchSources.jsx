import lodash from 'lodash';
import React from 'react';
import { Search } from 'semantic-ui-react';
import dashboardStore from '../stores/DashboardStore';
import * as ArticlesActions from '../actions/ArticlesActions';


export default class SearchSources extends React.Component {

  constructor() {
    super();

    this.allResults = [];
    this.matchingResults = [];

    this.handleResultSelect = this.handleResultSelect.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }


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

  resetComponent() {
    this.setState({
      isLoading: false,
      value: '',
    });
  }


  handleResultSelect(event, result) {
    this.setState({ value: result.title });
    ArticlesActions.changeNewsSource(result.value);
  }

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
