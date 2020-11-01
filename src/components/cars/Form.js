import React, { useState } from 'react';
import { carsCollection, timestamp } from '../../utils/firebase';

const initialData = { brand: '', color: '', price: 0, available: true };
function Form() {
  const [formData, setFormData] = useState(initialData);

  function handleFormSubmit(e) {
    e.preventDefault();
    carsCollection
      .add({
        ...formData,
        price: parseInt(formData.price),
        timeStamp: timestamp,
      })
      .then((data) => console.log(data));
  }

  function handleFormChange(e) {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });

    console.log(formData);
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
