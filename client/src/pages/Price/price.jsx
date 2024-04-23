// import React from 'react';
import './price.css';
import { useQuery, useMutation } from '@apollo/client';
import React, { useState } from "react";
import { ADD_PRICES } from '../../utils/mutations';
import auth from '../../utils/auth';
import { QUERY_ME } from "../../utils/queries";


const Price = () => {
  const [addPrices] = useMutation(ADD_PRICES);
  const { loading, data } = useQuery(QUERY_ME);

  const userData = data?.me || {};
  const prices  = userData?.prices || [];
  // const lastPickup = pickups[pickups?.length - 1] || {};

  // const [startDate, setStartDate] = useState(new Date());
  // const [time, setTime] = useState('10:00');

  const [formData, setFormData] = useState({
    Serial_Number: '',
    make_And_Model: ''
    
  });

  async function handleSubmit(event) {
    event.preventDefault();

    const location = document.getElementById('serialNumber').value;
    const notes = document.getElementById('makeAndModel').value;

    setFormData({
      Serial_Number: 'serialNumber',
    make_And_Model: 'makeAndModel'
    });

    console.log(formData);

    // send the request/mutation
    await addPrices({
      variables: {
        Serial_Number: 'serialNumber',
        make_And_Model: 'makeAndModel'
      },
    });
    window.location.reload();

  }

  if (loading) {
    return <h2>Loading</h2>
  }



  if (!auth.loggedIn()) {
    return <h1>Please login to access this page</h1>
  }

  return (
    <div className="container">

      <form onSubmit={handleSubmit}>
        {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />

        <TimePicker onChange={setTime} value={time} /> */}

        <label>Serial Number: </label>
        <input type="text" name="serialNumber" id="serialNumber" />

        <label> Make And Model: </label>
        <textarea id="makeAndModel"> </textarea>

        <button type="submit">Submit</button>
      </form>

      {/* {
        (lastPickup?.Date) ?
          (
            <div>
              
              <p>Date: {dayjs.unix(parseInt(lastPickup.Date/1000)).format("MMM/DD/YYYY")}</p>
              <p>Time: {lastPickup.Time}</p>
              <p>Location: {lastPickup.Location}</p>
              <p>Notes: {lastPickup.Notes}</p>
            </div>
          ) :
          (
            <h1>No pickup requested</h1>
          )
      } */}

    </div>



  );
}

export default Price;
