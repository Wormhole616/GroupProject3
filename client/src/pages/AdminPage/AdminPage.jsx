import { QUERY_PICKUPS } from "../../utils/queries";
import { useQuery } from "@apollo/client";

import './AdminPage.css'

export default function AdminPage() {
    const { loading, data } = useQuery(QUERY_PICKUPS);

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
                    {data?.pickups.map((pickup) => {
                    console.log(pickup.Date);
                    console.log(new Date());



                        if (pickup.Date > new Date()) {
                            <div key={pickup._id} >
                                <p>Date: {pickup.Date}</p>
                                <p>Time: {pickup.Time}</p>
                                <p>Location: {pickup.Location}</p>
                                <p>Notes: {pickup.Notes}</p>
                                <p>User Name: {pickup.user.name}</p>
                            </div>
                        }
                    })}

                    <hr />
                </div>
            )}


        </div>
    );
}