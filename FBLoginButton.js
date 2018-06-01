import React, { Component } from 'react';
import { View } from 'react-native';
import {AccessToken, LoginManager, LoginButton } from 'react-native-fbsdk';

export default class FBLoginButton extends Component {

  onLoginFacebook = () => {
    LoginManager
      .logInWithReadPermissions(['public_profile', 'email'])
      .then((result) => {
        console.log(`Login success with permission: ${result.grantedPermissions.toString()}`);
        //get acccess token
        return AccessToken.getCurrentAccessToken()
      })
      .then(data => {
        const credential = firebase.auth.FacebookAuthProvider.credential(data.accessTokenToken);
        return firebase.auth().signInWithCredential(credential);
      })
      .then((currentUser)=>{
        console.log(`Facebook Login with user: ${JSON.stringify(currentUser.toJSON())}`)
      })
      .catch((error)=>{
        console.log(`Facebook login fail with error: ${error}`)
      })
  }
  render() {
    return (
      <View>
        <LoginButton
        onPress={this.onLoginFacebook}
          // publishPermissions={["email"]}
          // onLoginFinished={
          //   (error, result) => {
          //     if (error) {
          //       alert("Login failed with error: " + error.message);
          //     } else if (result.isCancelled) {
          //       alert("Login was cancelled");
          //     } else {
          //       alert("Login was successful with permissions: " + result.grantedPermissions)
          //     }
          //   }
          // }
          // onLogoutFinished={() => alert("User logged out")}
          />
      </View>
    );
  }
};

module.exports = FBLoginButton;