import React, { useState, useRef, useEffect } from 'react';
import firebase, { usersCollection, usersRef } from '../../utils/firebase';

function Upload() {
  const [imageData, setImageData] = useState({
    image: null,
    url: '',
    progress: 0,
  });
  const puaseRef = useRef();
  const resumeRef = useRef();
  const cancelRef = useRef();

  function handleChange(e) {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      setImageData((prev) => {
        return { ...prev, image };
      });
    }
  }

  function handleUpload(e) {
    e.preventDefault();
    const { image } = imageData;
    const uploadTask = usersRef.child(image.name).put(image);

    uploadTask.on(
      'state_change',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setImageData({ ...imageData, progress });
      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log('complete');
      }
    );
  }

  return (
    <>
      <form onSubmit={handleUpload}>
        <progress value={imageData.progress} max='100' />
        <div className='form-group'>
          <label>File</label>
          <input className='form-control' type='file' onChange={handleChange} />
        </div>
        <button type='submit' className='btn btn-primary'>
          upload File
        </button>
      </form>

      <hr />

      <div className='form-group'>
        <button className='btn btn-primary' ref={puaseRef}>
          PAUSE
        </button>
      </div>

      <div className='form-group'>
        <button className='btn btn-primary' ref={resumeRef}>
          RESUME
        </button>
      </div>

      <div className='form-group'>
        <button className='btn btn-primary' ref={cancelRef}>
          CANCEL
        </button>
      </div>
    </>
  );
}

export default Upload;
