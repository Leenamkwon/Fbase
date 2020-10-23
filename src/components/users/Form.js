import React, { useState } from 'react';

const Form = () => {
  const [register, setRegister] = useState(true);
  const [user, setUser] = useState({ email: '', password: '' });

  const handleForm = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {};

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
            name='passowrd'
            value={user.password}
            onChange={handleChange}
          />
        </div>

        <button type='submit' className='btn btn-primary'>
          {register ? 'Register' : 'sign in'}
        </button>
      </form>
    </>
  );
};

export default Form;
