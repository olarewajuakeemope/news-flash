import React, { Component } from 'react';
import * as firebase from 'firebase';


class HomePageContainer extends Component {

  constructor() {
    super();
    const auth = firebase.auth();
    auth.onAuthStateChanged(user => {
      if (user) {
         this.props.history.push('/dashboard');
      } else {
         console.log('no user');
      }
    });
  }


  login() {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/plus.login');
    firebase.auth().signInWithPopup(provider).then(result => {       
      window.location.replace('/dashboard')
    }).catch(console.log('cant log user in'));
  }


  render() {
    return (
     <div>
      <div className="full-horizontal-whitespace" />
      <h1 className="text-center">Welcome to News Flash</h1>
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <h4 className="alert alert-info text-center">
              Please sign in using any of the options below.
            </h4>
            <div id="firebaseui-auth-container" />
             <button className="w3-btn w3-white w3-border w3-round-small" onClick={this.login.bind(this)}><img src="https://www.gstatic.com/firebasejs/ui/0.5.0/images/auth/google.svg" alt="google logo"/>Sign with Google</button>
            </div>
          <div className="col-xs-12 col-md-6">
            <div id="home-page-slider" className="carousel slide" data-ride="carousel">
              <ol className="carousel-indicators">
                <li data-target="#home-page-slider" data-slide-to="0" className="active" />
                <li data-target="#home-page-slider" data-slide-to="1" />
              </ol>
              <div className="carousel-inner" role="listbox">
                <div className="item active">
                  <img
                    className="d-block img-fluid"
                    src="https://res.cloudinary.com/worldgeek/image/upload/v1493551218/slide1_pao7l8.png"
                    alt="First slide"
                  />
                  <div className="carousel-caption">
                    <h3>The best sources. Worldwide.</h3>
                    <p>Read news from top publishers all around the world</p>
                  </div>
                </div>
                <div className="item">
                  <img
                    className="d-block img-fluid"
                    src="https://res.cloudinary.com/worldgeek/image/upload/v1493551217/slide2_wln6bq.png"
                    alt="Second slide"
                  />
                  <div className="carousel-caption">
                    <h3>Read about anything.</h3>
                    <p>Whatever topics interest you, they are all here.</p>
                  </div>
                </div>
              </div>
              <a className="carousel-control left" href="#home-page-slider" data-slide="prev">
                <span className="glyphicon glyphicon-chevron-left" />
              </a>
              <a className="carousel-control right" href="#home-page-slider" data-slide="next">
                <span className="glyphicon glyphicon-chevron-right" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default HomePageContainer;

