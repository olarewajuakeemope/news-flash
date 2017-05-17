import React from 'react';
import welcomeMessageStore from '../stores/WelcomeMessageStore';

/**
 * This Component shows some elements that welcome a user to the dashboard
 * and onboard them properly e.g a splash image with a welcome message.
 * @extends React.Component
 */
export default class WelcomeMessageContainer extends React.Component {
  /**
   * Sets up this Component with some default attributes e.g hide or show
   * this Component when appropriate.
   * @constructor
   */
  constructor() {
    super();
    this.state = {
      htmlClasses: ['row'],
    };

    welcomeMessageStore.on('articlesFetched', () => {
      this.setState({
        htmlClasses: welcomeMessageStore.getHtmlClasses(),
      });
    });
  }

  /**
   * Computes and returns a representation of this Component for rendering.
   * @return {ReactComponent|null|false} - A Component for DOM rendering.
   * Otherwise, return null or false to prevent the rendering of this Component.
   */
  render() {
    const currentHtmlClasses = this.state.htmlClasses.join(' ');
    return (
      <div className={currentHtmlClasses}>
        <img
          className="img-responsive center-block"
          alt="Welcome to the dashboard!"
          src="https://res.cloudinary.com/worldgeek/image/upload/c_scale,w_400/v1493551217/welcome-img_pbxehe.png"
        />
        <h1 className="display-4 text-center bg-light-blue">Welcome to your dashboard</h1>
        <p className="lead text-center">
          To read news articles from your desired source, please
           use the form in the navigation bar.
        </p>
      </div>
    );
  }
}
