import React, { useState } from 'react';
import firebase, { storageRef, usersRef } from '../../utils/firebase';

function Upload() {
  const [imageData, setImageData] = useState({
    image: null,
    url: '',
    progress: 0,
  });

  function handleUpload(e) {
    e.preventDefault();
    const { image } = imageData;
    const uploadTask = usersRef.child(`${image.name}`).put(image);

    uploadTask.on(
      'state_changed',
      (uploadSnapShot) => {
        const progress = Math.round(
          (uploadSnapShot.bytesTransferred / uploadSnapShot.totalBytes) * 100
        );
        console.log(uploadSnapShot.bytesTransferred, uploadSnapShot.totalBytes);
        setImageData((prev) => {
          return { ...prev, progress };
        });

        switch (uploadSnapShot.state) {
          case 'canceled':
            console.log('user cancel');
            break;
          case 'error':
            console.log('user error');
            break;
          case 'paused':
            console.log('user paused');
            break;
          case 'running':
            console.log('user running');
            break;
          case 'success':
            console.log('user success');
            break;
          default:
            return;
        }
      },
      (error) => {
        console.log(error);
      },
      (complete) => {
        console.log('upload complete');
        setImageData((prev) => {
          return { ...prev, progress: 0, image: null };
        });
      }
    );
  }

  function handleChange(e) {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      setImageData((prev) => {
        return { ...prev, image };
      });
    }
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
    </>
  );
}

export default Upload;
