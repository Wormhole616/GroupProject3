import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        name
        
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        name
      }
    }
  }
`;
export const ADD_PAYMENT = gql`
    mutation addPayment($paymentAmount: Float!, $paymentType: String!) {
        addPayment(paymentAmount: $paymentAmount, paymentType: $paymentType) {
        _id
        paymentAmount
        paymentType
        createdAt
        }
    }
    `;
export const ADD_PICKUP = gql`
    mutation addPickups($Date: String!, $Time: String!, $Location: String!, $Notes: String!) {
        addPickups(Date: $Date, Time: $Time, Location: $Location, Notes: $Notes) {
        _id
        Date
        Time
        Location
        Notes
        createdAt
        }
    }
    `;
export const ADD_TRANSACTION = gql`
    mutation addTransaction($transaction: String!, $quantitySold: Int!, $transactionTotal: Float!, $paymentType: String!) {
        addTransaction(transaction: $transaction, quantitySold: $quantitySold, transactionTotal: $transactionTotal, paymentType: $paymentType) {
        _id
        transaction
        quantitySold
        transactionTotal
        paymentType
        createdAt
        }
    }
    `;
