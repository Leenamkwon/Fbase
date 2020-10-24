import React, { useState } from 'react';
import { dataBase, firebaseTimestamp } from '../../utils/firebase';

const Forms = () => {
  const [formData, setFormData] = useState({
    brand: '',
    color: '',
    price: 0,
    available: true,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    dataBase.collection('cars').add({
      ...formData,
      price: parseInt(formData.price),
      available: formData.available ? true : false,
      createAt: firebaseTimestamp,
    });
  };

  const handleChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className='form-group'>
          <label>Brand</label>
          <input
            type='text'
            className='form-control'
            name='brand'
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className='form-group'>
          <label>color</label>
          <input
            type='text'
            className='form-control'
            name='color'
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className='form-group'>
          <label>price</label>
          <input
            type='text'
            className='form-control'
            name='price'
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className='form-group'>
          <label>available</label>
          <select
            type='text'
            className='form-control'
            name='available'
            onChange={(e) => handleChange(e)}
          >
            <option value={true}>yes</option>
            <option value={false}>no</option>
          </select>
        </div>
        <button type='submit'>submit</button>
      </form>
    </div>
  );
};

export default Forms;
