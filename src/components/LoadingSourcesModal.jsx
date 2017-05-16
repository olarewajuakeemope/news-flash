import React from 'react';
import { Modal, Image, Header } from 'semantic-ui-react';
import dashboardStore from '../stores/DashboardStore';




export default class LoadingSourcesModal extends React.Component {

  constructor() {
    super();

    this.state = {
      open: true,
      loadingImgClasses: [],
      messageClasses: [],
      message: 'We\'re updating our list of news sources... Please wait...',
    };

    dashboardStore.on('sourcesFetched', () => {
      this.setState({
        open: false,
      });
    });

    dashboardStore.on('fetchSourcesFailed', () => {
      this.setState({
        message: dashboardStore.message,
        loadingImgClasses: ['hidden'],
        messageClasses: ['alert', 'alert-danger'],
      });
    });
  }


  render() {
    return (
      <Modal open={this.state.open} basic dimmer size="fullscreen">
        <Header icon="refresh" content="Loading sources" />
        <Modal.Content image>
          <Image
            wrapped
            size="tiny"
            src="https://res.cloudinary.com/worldgeek/image/upload/v1493921714/blue-loader_m1txrh.gif"
            className={this.state.loadingImgClasses.join(' ')}
          />
          <Modal.Description>
            <h2
              className={this.state.messageClasses.join(' ')}
            >
              {this.state.message}
            </h2>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}
