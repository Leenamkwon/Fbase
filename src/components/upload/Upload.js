import React, { useState, useRef, useEffect } from 'react';
import firebase, { usersRef } from '../../utils/firebase';

function Upload() {
  const [imageData, setImageData] = useState({
    image: null,
    url: '',
    progress: 0,
  });
  const puaseRef = useRef();
  const resumeRef = useRef();
  const cancelRef = useRef();

  useEffect(() => {
    const pause = puaseRef.current;
    const resume = resumeRef.current;
    const cancel = cancelRef.current;
    const imageRef = usersRef.child('product-2.png');

    imageRef.getDownloadURL().then((downloadURL) => {
      console.log('FILE AVAILABLE AT', downloadURL);
    });

    return () => {
      pause.removeEventListener('click', null);
      resume.removeEventListener('click', null);
      cancel.removeEventListener('click', null);
    };
  }, []);

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
        setImageData((prev) => {
          return { ...prev, progress: 0, image: null };
        });
      },
      (complete) => {
        console.log('upload complete');
        setImageData((prev) => {
          return { ...prev, progress: 0, image: null };
        });

        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log('FILE AVAILABLE AT', downloadURL);
        });
      }
    );

    puaseRef.current.addEventListener('click', () => {
      uploadTask.pause();
    });
    resumeRef.current.addEventListener('click', () => {
      uploadTask.resume();
    });
    cancelRef.current.addEventListener('click', () => {
      uploadTask.cancel();
    });
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
