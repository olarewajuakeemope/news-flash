import React from 'react';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
import NavContainer from '../../components/NavContainer';
import FetchArticlesForm from '../../components/FetchArticlesForm';

chai.use(chaiEnzyme());
const expect = chai.expect;

const wrapper = mount(<NavContainer />);

describe('NavContainer', () => {
  it('should be defined', () => {
    expect(NavContainer).to.not.equal(undefined);
  });
});

describe('NavContainer', () => {
  const children = wrapper.children();
  it('should have an id of nav-container', () => {
    expect(wrapper).to.have.id('nav-container');
  });

  it('should have a class of row', () => {
    expect(wrapper).to.have.className('row');
  });

  it('should have two direct children', () => {
    expect(children).to.have.length(2);
  });

  it('should have a first child with an id of nav-controls', () => {
    expect(children.at(0)).to.have.id('nav-controls');
  });

  it('should have a first child with class col-md-12', () => {
    expect(children.at(0)).to.have.className('col-md-12');
  });

  it('should have a second child that\'s an instance of FetchArticlesForm', () => {
    expect(children.at(1).is(FetchArticlesForm)).to.equal(true);
  });

  it('should have a second child with an id of fetch-articles-form', () => {
    expect(children.at(1)).to.have.id('fetch-articles-form');
  });

  it('should have a first child with class col-md-12', () => {
    expect(children.at(1)).to.have.className('col-md-12');
  });
});
