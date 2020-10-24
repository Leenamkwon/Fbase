import React, { useEffect, useState } from 'react';
import Forms from './Forms';
import { dataBase } from '../../utils/firebase';
import { firebaseLooper } from '../../utils/tools';

const Cars = () => {
  const [car, setCar] = useState([]);

  useEffect(() => {
    dataBase
      .collection('cars')
      .get()
      .then((snapshot) => {
        const cars = firebaseLooper(snapshot);
        setCar(cars);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleCarData = () => {
    return (
      car &&
      car.map((item, i) => (
        <tr key={i}>
          <th>{item.id}</th>
          <th>{item.brand}</th>
          <th>{item.color}</th>
          <th>{item.price}</th>
        </tr>
      ))
    );
  };

  return (
    <div>
      <Forms />
      <table className='table table-dark'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Brand</th>
            <th>Color</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{handleCarData()}</tbody>
      </table>
    </div>
  );
};

// dataBase.collection('cars').onSnapshot((QuerySnapshot) => {
//   QuerySnapshot.docChanges().forEach((QueryDocumentSnapshot) => {
//     console.log(QueryDocumentSnapshot);
//   });
// });

export default Cars;
