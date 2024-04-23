import React from 'react'
import './transactions.css'
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_TRANSACTION } from '../../utils/mutations';
// import { QUERY_TRANSACTIONS } from '../../utils/queries';
import Auth from '../../utils/auth';


const Transactions = () => {
    return (
      <div className="container">
        <h1>Transactions</h1>
        <p>You can view and access your transaction history</p>

      </div>
    )
  }
  
  export default Transactions