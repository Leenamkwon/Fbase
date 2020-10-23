import React, { useEffect, useState } from 'react';
import { carsCollection } from '../../utils/firebase';
import { firebaseLooper } from '../../utils/tools';
import Forms from './Forms';

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [startReq, setStartReq] = useState({
    cars: null,
    start: 0,
    end: 5000,
  });
  // 컬렉션은 루핑해야하고 // doc은 특정 아이디로 찾아야함
  useEffect(() => {
    carsCollection
      // .where('color', '==', 'red') 특정 조건으로 리퀘스트 할 수 있음.
      // .limit(...number) 요청 개수
      // .limitToLast(...number) 마지막 요청 개수
      .orderBy('price')
      // .startAt(200) ex: 가격이 200달러 이상만 요청
      // .endAt(400) ex: 가격이 400달러 이하만 요청
      .startAt(startReq.start)
      .endAt(startReq.end)
      .get()
      .then((snapshot) => {
        const cars = firebaseLooper(snapshot);
        setCars(cars);
      })
      .catch((err) => console.log(err));
  }, [startReq]);

  const handleCarData = () => {
    return cars
      ? cars.map((item) => (
          <tr key={item.id}>
            <th>{item.id}</th>
            <th>{item.brand}</th>
            <th>{item.color}</th>
            <th>{item.price}</th>
          </tr>
        ))
      : null;
  };

  const sortResult = (val) => {
    setStartReq({ ...startReq, start: val[0], end: val[1] });
  };

  return (
    <>
      <button onClick={() => sortResult([0, 100])}> 0 ~ 100</button>
      <button onClick={() => sortResult([100, 200])}> 100 ~ 200</button>
      <button onClick={() => sortResult([200, 1000])}> 200 ~ 1000</button>

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
    </>
  );
};

export default Cars;
