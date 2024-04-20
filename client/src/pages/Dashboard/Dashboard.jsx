import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import auth from "../../utils/auth";

import AdminPage from "../AdminPage/AdminPage";

export default function Dashboard() {

    const {loading, data} = useQuery(QUERY_ME);

    const userData = data?.me || {};
    const transactions = userData?.transactions || [];
    const lastTransaction = transactions[transactions?.length -1] || {};

    if(loading) {
        return <h2>Loading</h2>
    }


    console.log(userData)

    if(userData?.isAdmin == true) {
        return <AdminPage />
    }

    return (
        <div>
            <h1>Dashboard</h1>

            <h2>Last Transaction</h2>
            <p>Transaction: {lastTransaction?.transaction}</p>
            <p>Amount: {lastTransaction?.transactionTotal}</p>
            <p>Payment Type: {lastTransaction?.paymentType}</p>
            <p>Quantity: {lastTransaction?.quantitySold}</p>

        </div>
    );
}