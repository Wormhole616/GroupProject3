import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      name
      email
     payments {
        _id
        paymentAmount
        paymentType
        createdAt
      }
      pickups {
        _id
        Date
        Time
        Location
        Notes
        createdAt
      }
      transactions {
        _id
        transaction
        quantitySold
        transactionTotal
        paymentType
        createdAt
      }
    }
  }
`;
export const QUERY_ME = gql`
  query QUERY_ME {
    me {
      _id
      email
      name
      isAdmin
      pickups {
        _id
        Date
        Time
        Location
        Notes
        createdAt
      }
      transactions {
        Notes
        _id
        createdAt
        paymentType
        quantitySold
        transactionTotal
        transaction
      }
    }
  }
`;

export const QUERY_PICKUPS = gql`
query QUERY_ALL_PICKUPS {
  pickups {
    Date
    Location
    Notes
    Time
    _id
    user {
      _id
      email
      isAdmin
      name
    }
  }
}
`

export const PRICES = gql`
query QUERY_ALL_PRICES {
  prices {
    serialNumber
    makeAndModel
    Notes
    _id
    user {
      _id
      email
      isAdmin
      name
    }
  }
}
`
