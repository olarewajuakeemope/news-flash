import React from 'react';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
import ArticlesContainer from '../../components/ArticlesContainer';

chai.use(chaiEnzyme());
const expect = chai.expect;

const wrapper = mount(<ArticlesContainer />);

describe('ArticlesContainer', () => {
  it('should be defined', () => {
    expect(ArticlesContainer).to.not.equal(undefined);
  });
});

describe('ArticlesContainer', () => {
  it('should have an id of articles-container', () => {
    expect(wrapper).to.have.id('articles-container');
  });

  it('should have a class of row', () => {
    expect(wrapper).to.have.className('row');
  });
});
