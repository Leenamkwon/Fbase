import React, { useState } from 'react';
import firebase from '../../utils/firebase';

const Form = () => {
  const [register, setRegister] = useState(true);
  const [user, setUser] = useState({ email: '', password: '' });

  const handleForm = (e) => {
    e.preventDefault();
    const { email, password } = user;

    if (register) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  };

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log('used logged out');
      });
  };

  const handleGetUserInfo = () => {
    let getUser = firebase.auth().currentUser;
    if (getUser) {
    }
  };

  return (
    <>
      <form onSubmit={(e) => handleForm(e)}>
        <div className='form-group'>
          <label>email</label>
          <input
            type='email'
            className='form-control'
            name='email'
            value={user.email}
            onChange={handleChange}
          />
        </div>

        <div className='form-group'>
          <label>password</label>
          <input
            type='password'
            className='form-control'
            name='password'
            value={user.password}
            onChange={handleChange}
          />
        </div>

        <button type='submit' className='btn btn-primary'>
          {register ? 'Register' : 'sign in'}
        </button>
      </form>
      <hr />
      <button onClick={handleLogout}>logout</button>
      <hr />
      <button onClick={handleGetUserInfo}>Ask about the user</button>
    </>
  );
};

export default Form;
