import { QUERY_PICKUPS } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import './AdminPage.css'

export default function AdminPage() {
  dayjs.extend(isSameOrAfter)

  const { loading, data } = useQuery(QUERY_PICKUPS);
  const upcomingPickups = data?.pickups.filter(pickup => {
    //   const pickupDate = new Date(pickup.Date);
    //   const currentDate = new Date();

    console.log(pickup.Date)

    return dayjs().isSameOrAfter(dayjs(pickup.Date))

    // return pickupDate >= currentDate;

  }) || [];

  return (
    <div>
      <h1>This is the Admin Page</h1>

      <p>Only Admins can see this page</p>

      <h2>Upcoming Pickups</h2>
      <p>Here are the upcoming pickups:</p>
      {loading ? (
        <h2>Loading...</h2>

      ) : (

        <div className="container">
          {upcomingPickups.map((pickup) => (
            <div key={pickup._id} >
              <p>Date: {dayjs(pickup.Date).format("MMM/DD")}</p>
              <p>Time: {pickup.Time}</p>
              <p>Location: {pickup.Location}</p>
              <p>Notes: {pickup.Notes}</p>
              <p>User Name: {pickup?.user?.name}</p>
            </div>
          ))}

          <hr />
        </div>
      )}


    </div>
  );
}