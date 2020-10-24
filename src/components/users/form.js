import React, { useState } from 'react';
import firebase from '../../utils/firebase';

const Form = () => {
  const [register, setRegister] = useState(true);
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
          console.log(response);
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
      console.log(getUser);
    } else {
      console.log('no user');
    }
  }

  function handleUpdateEmail() {
    let getUser = firebase.auth().currentUser;
    let credential = firebase.auth.EmailAuthProvider.credential('');

    if (getUser) {
      getUser.updateEmail('hello@gmail.com').then((res) => {
        console.log(res);
      });
    }
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
    </>
  );
};

export default Form;
