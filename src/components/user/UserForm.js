import React, { useState } from 'react';
import firebase from '../../utils/firebase';

function UserForm() {
  const [register, setRegister] = useState(true);
  const [user, setUser] = useState({ email: '', password: '' });
  const [isUser, setIsUser] = useState(false);

  function handleForm(e) {
    e.preventDefault();
    const { email, password } = user;

    if (register) {
      console.log('register');
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((response) => {
          response.user.sendEmailVerification();
          setIsUser((prev) => {
            return { ...prev, email: '', password: '' };
          });
        })
        .catch((err) => console.log(err));
    } else {
      console.log('login');
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((user) => setIsUser(true))
        .catch((err) => console.log(err));
    }
  }

  function changeHandler(e) {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  function handleLogout() {
    firebase
      .auth()
      .signOut()
      .then(() => setIsUser(false));
  }

  function handleGetUser() {
    let getUser = firebase.auth().currentUser;
    if (getUser) {
    } else {
    }
  }

  function handleUpdateEmail() {
    let getUser = firebase.auth().currentUser;
    let credential = firebase.auth.EmailAuthProvider.credential(
      'namkwon12@gmail.com',
      'Stiis7812@'
    );

    if (getUser) {
      getUser.reauthenticateWithCredential(credential).then((res) => {
        getUser.updateEmail('namkwon12@naver.com');
      });
    } else {
    }
  }

  function handleUpdateProfile() {
    let getUser = firebase.auth().currentUser;
    getUser
      .updateProfile({
        displayName: 'Steve',
        photoURL: 'whatever',
      })
      .then(() => {
        console.log(getUser);
      });
  }

  function handleGoogleSignin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <form onSubmit={handleForm}>
        <div className='form-group'>
          <label>Login</label>
          <input
            type='email'
            className='form-control'
            name='email'
            onChange={changeHandler}
            value={user.email}
          />
        </div>

        <div className='form-group'>
          <label>Password</label>
          <input
            type='password'
            className='form-control'
            name='password'
            onChange={changeHandler}
            value={user.password}
          />
        </div>
        <button className='btn btn-primary' type='submit'>
          {register ? 'register' : 'login'}
        </button>

        {isUser && (
          <>
            <hr />
            <button className='btn btn-primary' onClick={handleLogout}>
              logout
            </button>
          </>
        )}

        <hr />
        <button onClick={() => handleGetUser}>Ask about the user</button>
        <hr />
        <button onClick={() => handleUpdateEmail}>update email</button>
        <hr />
        <button onClick={() => handleUpdateProfile}>Update Profile</button>
        <hr />
        <button onClick={() => handleGoogleSignin()}>Update Profile</button>
      </form>
    </>
  );
}

export default UserForm;
