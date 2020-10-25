import React, { useState } from 'react';
import firebase, { userCollection } from '../../utils/firebase';

const Form = () => {
  const [register, setRegister] = useState(false);
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  function handleForm(e) {
    e.preventDefault();
    const { email, password } = user;

    if (register) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((response) => {
          handleStoreRegisterUser(response);
          response.user.sendEmailVerification().then(() => {
            console.log('mail sent');
          });
        });
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((response) => {
          console.log(response);
        });
    }

    setRegister(false);
  }

  function handleStoreRegisterUser(data) {
    userCollection
      .doc(data.user.uid)
      .set({
        email: data.user.email,
      })
      .then((data) => console.log(data));
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setUser((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function handleLogout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log('user logout');
      });
  }

  function handleGetUserInfo() {
    let getUser = firebase.auth().currentUser;

    if (getUser) {
      getUser.getIdTokenResult().then((res) => {
        console.log(res);
      });
    } else {
      console.log('no user');
    }
  }

  function handleUpdateEmail() {
    let getUser = firebase.auth().currentUser;
    let credential = firebase.auth.EmailAuthProvider.credential(
      'namkwon12@gmail.com',
      'Stiis7812@'
    ); // 사용자 인증

    if (getUser) {
      // 사용자 인증이 맞다면 이메일 업데이트 확인
      getUser.reauthenticateWithCredential(credential).then((res) => {
        getUser.updateEmail('namkwon@gmail.com');
      });
    }
  }

  function handleUpdateProfile() {
    let getUser = firebase.auth().currentUser;

    getUser
      .updateProfile({
        displayName: 'namkwon',
        photoURL: 'https://photo.jpeg',
      })
      .then(() => {
        console.log(getUser);
      });
  }

  function handleGoogleSignIn() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        handleStoreRegisterUser(result);
        // This gives you a Google Access Token.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
      });
  }

  return (
    <>
      <form onSubmit={(e) => handleForm(e)}>
        <div className='form-group'>
          <label>email</label>
          <input
            type='email'
            className='form-control'
            name='email'
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className='form-group'>
          <label>password</label>
          <input
            type='password'
            className='form-control'
            name='password'
            onChange={(e) => handleChange(e)}
          />
        </div>

        <button type='submit' className='btn btn-primary'>
          {register ? 'register' : 'sign in'}
        </button>

        <hr />

        {!register && (
          <button
            type='submit'
            className='btn btn-primary'
            onClick={handleLogout}
          >
            logout
          </button>
        )}
      </form>

      <hr />
      <button className='btn btn-primary' onClick={handleGetUserInfo}>
        check user
      </button>

      <hr />
      <button className='btn btn-primary' onClick={handleUpdateEmail}>
        update user email
      </button>

      <hr />
      <button className='btn btn-primary' onClick={handleUpdateProfile}>
        update profile
      </button>

      <hr />
      <button className='btn btn-primary' onClick={handleGoogleSignIn}>
        Google signin
      </button>
    </>
  );
};

export default Form;
