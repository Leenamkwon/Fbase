import React, { useEffect, useState } from 'react';
import firebase, { carsCollection, timestamp } from '../../utils/firebase';

const initialData = { brand: '', color: '', price: 0, available: true };
function Form() {
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    carsCollection.doc('Ng3mshKq69gJxjDuinJf').update({
      // nested object update
      'dealers.age': 15,
      // nested array pushed
      tag: firebase.firestore.FieldValue.arrayUnion('4'),
      color: 'black',
    });
  }, []);

  function handleFormSubmit(e) {
    e.preventDefault();
    carsCollection
      .doc()
      .set({
        ...formData,
        price: parseInt(formData.price),
        createdAt: timestamp,
        dealers: {
          age: 20,
          location: 'NY',
          careear: '9 years',
        },
        tag: ['1', '2', '3'],
      })
      .then((data) => console.log(data));
  }

  function handleFormChange(e) {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div className='form-group'>
          <label>Brand</label>
          <input
            type='text'
            className='form-control'
            name='brand'
            onChange={handleFormChange}
            value={formData.brand}
          />
        </div>

        <div className='form-group'>
          <label>Color</label>
          <input
            type='text'
            className='form-control'
            name='color'
            onChange={handleFormChange}
            value={formData.color}
          />
        </div>

        <div className='form-group'>
          <label>Price</label>
          <input
            type='text'
            className='form-control'
            name='price'
            onChange={handleFormChange}
            value={formData.Price}
          />
        </div>

        <div className='form-group'>
          <label>Available</label>
          <select
            className='form-control'
            name='available'
            onChange={handleFormChange}
            value={formData.available}
          >
            <option value='true'>true</option>
            <option value='false'>false</option>
          </select>
        </div>

        <button type='submit' className='btn btn-primary'>
          submit
        </button>
      </form>
    </>
  );
}

export default Form;
