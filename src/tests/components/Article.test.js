import React from 'react';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
import Article from '../../components/Article';

chai.use(chaiEnzyme());
const expect = chai.expect;

const emptyProps = {};
const props = {
  id: '1001',
  title: 'It is alive!',
  description: 'The dog is alive! Yes! And that halves the price of garri in the market.',
  url: 'https://foo.example.com',
  imageUrl: 'https://bar.example.com/logo.png',
  author: 'Lagbaja Tamedu',
  publishedAt: '2016-04-21T13:45:57Z',
};

describe('The Article component', () => {
  it('should be defined', () => {
    expect(Article).to.not.equal(undefined);
  });
});

describe('When NOT initialized with any props, the Article component', () => {
  const wrapper = mount(<Article {...emptyProps} />);
  it('should NOT have an id prop', () => {
    expect(wrapper).to.not.have.prop('id');
  });

  it('should NOT have a title prop', () => {
    expect(wrapper).to.not.have.prop('title');
  });

  it('should NOT have a description prop', () => {
    expect(wrapper).to.not.have.prop('description');
  });

  it('should NOT have a url prop', () => {
    expect(wrapper).to.not.have.prop('url');
  });

  it('should NOT have an imageUrl prop', () => {
    expect(wrapper).to.not.have.prop('imageUrl');
  });

  it('should NOT have an author prop', () => {
    expect(wrapper).to.not.have.prop('author');
  });

  it('should NOT have a publishedAt prop', () => {
    expect(wrapper).to.not.have.prop('publishedAt');
  });
});

describe('When initialized with a correct set of props, the Article component', () => {
  const wrapper = mount(<Article {...props} />);
  console.log(`The set of props used to initialize Article is: \n\n${JSON.stringify(props)}\n`);
  it('should have an id prop', () => {
    expect(wrapper).to.have.prop('id');
  });

  it(`should have its id prop equal to ${props.id}`, () => {
    expect(wrapper).to.have.prop('id').deep.equal(props.id);
  });

  it('should have a title prop', () => {
    expect(wrapper).to.have.prop('title');
  });

  it(`should have its title prop equal to ${props.title}`, () => {
    expect(wrapper).to.have.prop('title').deep.equal(props.title);
  });

  it('should have a description prop', () => {
    expect(wrapper).to.have.prop('description');
  });

  it(`should have its description prop equal to ${props.description}`, () => {
    expect(wrapper).to.have.prop('description').deep.equal(props.description);
  });

  it('should have a url prop', () => {
    expect(wrapper).to.have.prop('url');
  });

  it(`should have its url prop equal to ${props.url}`, () => {
    expect(wrapper).to.have.prop('url').deep.equal(props.url);
  });

  it('should have an imageUrl prop', () => {
    expect(wrapper).to.have.prop('imageUrl');
  });

  it(`should have its imageUrl prop equal to ${props.imageUrl}`, () => {
    expect(wrapper).to.have.prop('imageUrl').deep.equal(props.imageUrl);
  });

  it('should have an author prop', () => {
    expect(wrapper).to.have.prop('author');
  });

  it(`should have its author prop equal to ${props.author}`, () => {
    expect(wrapper).to.have.prop('author').deep.equal(props.author);
  });

  it('should have a publishedAt prop', () => {
    expect(wrapper).to.have.prop('publishedAt');
  });

  it(`should have its publishedAt prop equal to ${props.publishedAt}`, () => {
    expect(wrapper).to.have.prop('publishedAt').deep.equal(props.publishedAt);
  });
});

describe('For the elements in an Article,', () => {
  const wrapper = mount(<Article {...props} />);
  const allLinks = wrapper.find('a');
  it('all links should open in a new tab', () => {
    expect(allLinks.every('[target="_blank"]')).to.equal(true);
  });

  const linkRel = 'noopener noreferrer';
  it(`all links should have rel="${linkRel}"`, () => {
    expect(allLinks.every('[rel="noopener noreferrer"]')).to.equal(true);
  });

  it('the Article itself should have a row class', () => {
    expect(wrapper).to.have.className('row');
  });

  it('the Article should have two direct children', () => {
    expect(wrapper.children()).to.have.length(2);
  });

  const firstChild = wrapper.childAt(0);
  it('the first child should be a div', () => {
    expect(firstChild.is('div')).to.equal(true);
  });

  it('the first child to have a class of col-xs-4', () => {
    expect(firstChild).to.have.className('col-xs-4');
  });

  const secondChild = wrapper.childAt(1);
  it('the second child should be a div', () => {
    expect(secondChild.is('div')).to.equal(true);
  });

  it('the second child to have a class of col-xs-8', () => {
    expect(secondChild).to.have.className('col-xs-8');
  });
});
