import React, { useState } from 'react';
import { carsCollection, firebaseTimestamp } from '../../utils/firebase';

const Forms = () => {
  const [doc, setDoc] = useState({
    brand: '',
    color: '',
    price: '',
    available: true,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // 배열 업데이트 arrayUnion, 배열 삭제 arrayRemove

    // 기존 문서에 필드를 추가하려면 add()
    // 새로운 문서 필드를 추가하려면 set()
    carsCollection
      .add({
        ...doc,
        available: doc.available === 'true' ? true : false,
        createAd: firebaseTimestamp(),
        dealers: {
          seoul: true,
          ny: true,
          ca: true,
        },
        tag: ['good', 'xoxo', 'cars'],
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    setDoc({
      ...doc,
      [name]: [name] === 'price' ? +target.value : target.value,
    });
  };

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className='form-group'>
          <label>Brand</label>
          <input
            type='text'
            className='form-control'
            name='brand'
            value={doc.brand}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className='form-group'>
          <label>color</label>
          <input
            type='text'
            className='form-control'
            name='color'
            value={doc.color}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className='form-group'>
          <label>price</label>
          <input
            type='number'
            className='form-control'
            name='price'
            value={doc.price}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className='form-group'>
          <label>available</label>
          <select
            className='form-control'
            name='available'
            value={doc.available}
            onChange={(e) => handleChange(e)}
          >
            <option value={true}>yes</option>
            <option value={false}>no</option>
          </select>
        </div>

        <button type='submit' className='btn btn-primary'>
          submit
        </button>
      </form>
    </>
  );
};

carsCollection.onSnapshot((querySnapshot) => {
  console.log(querySnapshot.docChanges());
});

export default Forms;
