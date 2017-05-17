import React from 'react';
import * as firebase from 'firebase';
import DashboardApp from './DashboardApp';
import LoadingSourcesModal from './LoadingSourcesModal';


/**
 * This Component houses the DashboardApp and LoadingSourceModal components.
 * @return {ReactComponent|null|false} - A Component for DOM rendering.
 */
export default function DashboardContainer() {
    const auth = firebase.auth();
    auth.onAuthStateChanged(user => {
     if (!user) {
        window.location.replace('/');
     }
   });
  return (
       <div>
        <div className="col-lg-2 col-md-1 col-sm-0" />
         <LoadingSourcesModal />
         <DashboardApp />
        <div className="col-lg-2 col-md-1 col-sm-0" />
       </div>
  );
}
