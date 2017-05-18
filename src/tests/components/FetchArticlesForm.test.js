import React from 'react';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
import SearchSources from '../../components/SearchSources';
import FetchArticlesForm from '../../components/FetchArticlesForm';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('FetchArticlesForm', () => {
  it('should be defined', () => {
    expect(FetchArticlesForm).to.not.equal(undefined);
  });
});

const wrapper = mount(<FetchArticlesForm />);
describe('When rendered, FetchArticlesForm', () => {
  it('should have an id of fetch-articles-form', () => {
    expect(wrapper).to.have.id('fetch-articles-form');
  });

  it('should have a class of col-md-12', () => {
    expect(wrapper).to.have.className('col-md-12');
  });

  const children = wrapper.children();
  it('should have four (4) direct children', () => {
    expect(children).to.have.length(4);
  });

  const firstChild = children.at(0);
  it('should have a first child that has an id of search-sources-container', () => {
    expect(firstChild).to.have.id('search-sources-container');
  });

  it('should have a first child contains one element', () => {
    expect(firstChild.children()).to.have.length(1);
  });

  it('should have a first child that contains a SearchSources component', () => {
    expect(firstChild.children().at(0).is(SearchSources)).to.equal(true);
  });

  const secondChild = children.at(1);
  it('should have a second child with an id of choose-news-source-container', () => {
    expect(secondChild).to.have.id('choose-news-source-container');
  });

  it('should have a second child that contains a select element with an id of choose-news-source', () => {
    expect(secondChild.find('select')).to.have.id('choose-news-source');
  });

  const thirdChild = children.at(2);
  it('should have a third child with an id of choose-sort-container', () => {
    expect(thirdChild).to.have.id('choose-sort-container');
  });

  it('should have a third child that contains a select element with an id of choose-sort', () => {
    expect(thirdChild.find('select')).to.have.id('choose-sort');
  });

  const fourthChild = children.at(3);
  it('should have a fourth child with an id of fetch-articles-btn-container', () => {
    expect(fourthChild).to.have.id('fetch-articles-btn-container');
  });

  it('should have a fourth child that contains a button element with an id of fetch-articles-btn', () => {
    expect(fourthChild.find('button')).to.have.id('fetch-articles-btn');
  });

  it('should have a #fetch-articles-btn button element that also has a class btn', () => {
    expect(fourthChild.find('button')).to.have.className('btn');
  });

  it('should have a #fetch-articles-btn button element that also has a class btn-primary', () => {
    expect(fourthChild.find('button')).to.have.className('btn-primary');
  });
});
