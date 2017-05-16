import React from 'react';
import * as firebase from 'firebase';
import DashboardApp from './DashboardApp';
import LoadingSourcesModal from './LoadingSourcesModal';



export default function DashboardContainer() {
    const auth = firebase.auth();
    auth.onAuthStateChanged(user => {
     if (user) {
         console.log(user.uid);
     } else {
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
