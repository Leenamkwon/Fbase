import React, { useState } from 'react';
import firebase from '../../utils/firebase';

function UserForm() {
  const [register, setRegister] = useState(true);
  const [user, setUser] = useState({ email: '', password: '' });

  function handleForm(e) {
    e.preventDefault();
    const { email, password } = user;

    if (register) {
      console.log('register');
      firebase.auth().createUserWithEmailAndPassword(email, password);
    } else {
      console.log('login');
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch((err) => console.log(err));
    }
  }

  function changeHandler(e) {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  return (
    <>
      <form onSubmit={handleForm}>
        <div className='form-group'>
          <label>Login</label>
          <input
            type='email'
            className='form-control'
            name='brand'
            onChange={changeHandler}
            value={user.email}
          />
        </div>

        <div className='form-group'>
          <label>Password</label>
          <input
            type='text'
            className='form-control'
            name='brand'
            onChange={changeHandler}
            value={user.password}
          />
        </div>
        <button className='btn btn-primary' type='submit'>
          {register ? 'register' : 'login'}
        </button>
      </form>
    </>
  );
}

export default UserForm;
