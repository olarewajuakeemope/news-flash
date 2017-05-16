import React from 'react';
import * as firebase from 'firebase';


/**
 * This Component houses the DashboardApp and LoadingSourceModal components.
 * @return {ReactComponent|null|false} - A Component for DOM rendering.
 */
export default function DashboardContainer() {
    const auth = firebase.auth();
    auth.onAuthStateChanged(user => {
     if (user) {
         console.log(user.uid);
     } else {
         console.log('no user');
     }
    });
  return (
    <div>
      <h1>hello</h1>
    </div>
  );
}
