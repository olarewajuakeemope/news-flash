import React from 'react';
import * as firebase from 'firebase';
import FetchArticlesForm from './FetchArticlesForm';
import * as ArticlesActions from '../actions/ArticlesActions';



export default function NavContainer() {
  ArticlesActions.fetchSources();

  const signOut = (event) => {
    event.preventDefault();
    firebase.auth().signOut().then(() => {
       window.location.replace('/');
    }).catch(console.log('cant log user out'));
  };

  return (
    <div id="nav-container" className="row">
      <div id="nav-controls" className="col-md-12">
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <ul className="nav navbar-nav navbar-left" />
            <ul className="nav navbar-nav navbar-right">
              <li>
                <button
                  id="sign-out-btn"
                  onClick={signOut}
                  className="btn btn-info navbar-btn"
                >
                  Sign out
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <FetchArticlesForm />
    </div>
  );
}
