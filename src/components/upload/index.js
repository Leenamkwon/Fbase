import React, { useState } from 'react';
import { userRef } from '../../utils/firebase';

const Upload = () => {
  const [store, setSotre] = useState({
    image: null,
    url: '',
    progress: 0,
  });

  function handleUpload(e) {
    e.preventDefault();
    const { image } = store;
    const uploadTask = userRef.child(`${image.name}`).put(image);

    uploadTask.on(
      'state_changed',
      (snapshot) => {},
      (error) => {},
      (complete) => {}
    );
  }

  function handleChange(e) {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      setSotre({
        ...store,
        image,
      });
    }
    return;
  }

  return (
    <>
      <form onSubmit={handleUpload}>
        <div className='form-group'>
          <label>File</label>
          <input
            className='form-control'
            type='file'
            onChange={handleChange}
          ></input>
        </div>

        <button type='submit' className='btn btn-primary'>
          Upload file
        </button>
      </form>
    </>
  );
};

export default Upload;
