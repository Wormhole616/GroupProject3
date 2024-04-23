import { useQuery, useMutation } from "@apollo/client";
// import "./pickup.css";
import TimePicker from "react-time-picker";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "./TimePicker.css";
import "react-clock/dist/Clock.css";
import { ADD_PICKUP } from "../../utils/mutations";
import auth from "../../utils/auth";

import { QUERY_ME } from "../../utils/queries";
import "react-datepicker/dist/react-datepicker.css";
// CSS Modules, react-datepicker-cssmodules.css
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import dayjs from "dayjs";

const Pickup = () => {
  const [addPickup] = useMutation(ADD_PICKUP);
  const { loading, data } = useQuery(QUERY_ME);

  const userData = data?.me || {};
  const pickups = userData?.pickups || [];
  const lastPickup = pickups[pickups?.length - 1] || {};

  const [startDate, setStartDate] = useState(new Date());
  const [time, setTime] = useState("10:00");

  const [formData, setFormData] = useState({
    Date: "",
    Time: "",
    Location: "",
    Notes: "",
  });

  async function handleSubmit(event) {
    event.preventDefault();

    const location = document.getElementById("location").value;
    const notes = document.getElementById("notes").value;

    setFormData({
      Date: startDate,
      Time: time,
      Location: location,
      Notes: notes,
    });

    console.log(formData);

    // send the request/mutation
    await addPickup({
      variables: {
        Date: startDate,
        Time: time,
        Location: location,
        Notes: notes,
      },
    });
    window.location.reload();
  }

  if (loading) {
    return <h2>Loading</h2>;
  }

  if (!auth.loggedIn()) {
    return <h1>Please login to access this page</h1>;
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <label>Select a date:</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
        <label>Enter a time:</label>
        <TimePicker onChange={setTime} value={time} />

        <label className="addressLbl">Enter address location:</label>
        <input type="text" name="Location" id="location" />

        <label> Notes: </label>
        <textarea id="notes"> </textarea>

        <button type="submit">Submit</button>
      </form>

      {lastPickup?.Date ? (
        <div>
          <p>
            Date:{" "}
            {dayjs.unix(parseInt(lastPickup.Date / 1000)).format("MMM/DD/YYYY")}
          </p>
          <p>Time: {lastPickup.Time}</p>
          <p>Location: {lastPickup.Location}</p>
          <p>Notes: {lastPickup.Notes}</p>
        </div>
      ) : (
        <h2>No pickup requested</h2>
      )}
    </div>
  );
};

export default Pickup;
