import React from 'react';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
import AppStatus from '../../components/AppStatus';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('AppStatus', () => {
  it('should be defined', () => {
    expect(AppStatus).to.not.equal(undefined);
  });
});

const wrapper = mount(<AppStatus />);
describe('AppStatus', () => {
  it('should have an id of app-status-container', () => {
    expect(wrapper).to.have.id('app-status-container');
  });

  it('should have a class hidden', () => {
    expect(wrapper).to.have.className('hidden');
  });

  const children = wrapper.children();
  it('should have three (3) direct children', () => {
    expect(children).to.have.length(3);
  });

  // Expect the first child to be an img that's hidden by default
  const firstChild = children.at(0);
  it('should have a first child that\'s an img', () => {
    expect(firstChild.is('img')).to.equal(true);
  });

  it('should have a first child that has an id of loading-articles', () => {
    expect(firstChild).to.have.id('loading-articles');
  });

  const loadImgSrc = 'https://res.cloudinary.com/worldgeek/image/upload/v1493551216/loading-img_zqnq20.gif';
  it(`should have a first child that has src="${loadImgSrc}"`, () => {
    expect(firstChild).to.have.attr('src', loadImgSrc);
  });

  it('should have a first child that has class img-responsive', () => {
    expect(firstChild).to.have.className('img-responsive');
  });

  it('should have a first child that has class center-block', () => {
    expect(firstChild).to.have.className('center-block');
  });

  // Expect the first child to be an img that's hidden by default
  const secondChild = children.at(1);
  it('should have a second child that\'s an img', () => {
    expect(secondChild.is('img')).to.equal(true);
  });

  it('should have a second child that has an id of error-loading-articles', () => {
    expect(secondChild).to.have.id('error-loading-articles');
  });

  const errorImgSrc = 'https://res.cloudinary.com/worldgeek/image/upload/v1493551216/error-loading-img_z8tzia.png';
  it(`should have a second child that has src="${errorImgSrc}"`, () => {
    expect(secondChild).to.have.attr('src', errorImgSrc);
  });

  it('should have a second child that has class img-responsive', () => {
    expect(secondChild).to.have.className('img-responsive');
  });

  it('should have a second child that has class center-block', () => {
    expect(secondChild).to.have.className('center-block');
  });

  it('should have a second child that has class hidden', () => {
    expect(secondChild).to.have.className('hidden');
  });

  const thirdChild = children.at(2);
  it('should have a third child that is an h3', () => {
    expect(thirdChild.is('h3')).to.equal(true);
  });

  it('should have third child that has class text-center', () => {
    expect(thirdChild).to.have.className('text-center');
  });

  it('should have a third child that contains no text by default', () => {
    expect(thirdChild.render().text()).to.equal('');
  });
});

describe('When the status of fetching news changes, AppStatus', () => {
  const startFetchState = {
    isFetching: true,
    isErrorFetch: false,
    isSuccessFetch: false,
    message: 'Loading... Please wait...',
  };
  const startFetchWrapper = mount(<AppStatus />);
  startFetchWrapper.setState(startFetchState);
  it('should show a loading image when fetching articles starts', () => {
    expect(startFetchWrapper.childAt(0)).to.not.have.className('hidden');
  });

  it('should NOT show an error image when fetching articles starts', () => {
    expect(startFetchWrapper.childAt(1)).to.have.className('hidden');
  });

  it('should show a loading message when fetching articles starts', () => {
    expect(startFetchWrapper.childAt(2).render().text()).to.equal('Loading... Please wait...');
  });

  const errorFetchState = {
    isFetching: false,
    isErrorFetch: true,
    isSuccessFetch: false,
    message: 'Oops! Failed to fetch news articles. Please try again.',
  };
  const errorFetchWrapper = mount(<AppStatus />);
  errorFetchWrapper.setState(errorFetchState);
  it('should NOT show a loading image when fetching articles fails', () => {
    expect(errorFetchWrapper.childAt(0)).to.have.className('hidden');
  });

  it('should show an error image when fetching articles fails', () => {
    expect(errorFetchWrapper.childAt(1)).to.not.have.className('hidden');
  });

  it('should show an error message when fetching articles fails', () => {
    expect(errorFetchWrapper.childAt(2).render().text()).to.equal('Oops! Failed to fetch news articles. Please try again.');
  });

  const successFetchState = {
    isFetching: false,
    isErrorFetch: false,
    isSuccessFetch: true,
  };
  const successFetchWrapper = mount(<AppStatus />);
  successFetchWrapper.setState(successFetchState);
  it('should be entirely hidden when fetching articles succeeds', () => {
    expect(successFetchWrapper).to.have.className('hidden');
  });
});
