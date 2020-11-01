import React, { useEffect, useState } from 'react';
import { carsCollection } from '../../utils/firebase';
import { firebaseLooper } from '../../utils/tools';
import Form from './Form';

function Cars() {
  const [cars, setCars] = useState([]);

  // collection => firebase.fireStore().collection(collectionName)
  // document => firebase.fireStore().doc(path)

  useEffect(() => {
    carsCollection
      .get()
      .then((snapshot) => {
        const data = firebaseLooper(snapshot);
        setCars(data);
      })
      .catch((err) => console.log(err));

    // carsCollection
    //   .where('color', '==', 'red')
    //   .get()
    //   .then((snapshot) => snapshot.forEach((doc) => console.log(doc.data())));
  }, []);

  function handleCarData(cars) {
    return cars?.map((data, i) => {
      return (
        <tr key={i}>
          <th>{data.id}</th>
          <th>{data.brand}</th>
          <th>{data.color}</th>
          <th>{data.price}</th>
        </tr>
      );
    });
  }

  return (
    <>
      <Form />
      <table className='table table-dark'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Brand</th>
            <th>Color</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{handleCarData(cars)}</tbody>
      </table>
    </>
  );
}

// carsCollection.onSnapshot((querySnapshot) => {
//   querySnapshot.docChanges().forEach((change) => {
//     console.log(change.doc.data());
//   });
// });

export default Cars;
