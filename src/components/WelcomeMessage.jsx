import React from 'react';
import welcomeMessageStore from '../stores/WelcomeMessageStore';


export default class WelcomeMessageContainer extends React.Component {

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
