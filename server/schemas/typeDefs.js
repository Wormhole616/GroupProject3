

const typeDefs = `
type Users {
  _id: ID
  name: String
  email: String
  password: String
  isAdmin: Boolean
  createdAt: String
  payments: [Payments]
  pickups: [Pickups]
  transactions: [Transactions]
}
type Payments {
  _id: ID
  paymentAmount: Float
  paymentType: String
  createdAt: String
  payments: [Payments]
}
type Pickups {
  _id: ID
  Date: String
  Time: String
  Location: String
  Notes: String
  createdAt: String
  pickups: [Pickups]
  user: Users
}
type Transactions {
  _id: ID
  transaction: String
  quantitySold: Int
  transactionTotal: Float
  paymentType: String
  createdAt: String
  Notes: String
  transactions: [Transactions]
  user: Users

}
type Auth {
  token: ID!
  user: Users
}
type Query {
  users: [Users]
  user(name: String!): Users
  payments: [Payments]
  payment(paymentId: ID!): Payments
  pickups: [Pickups]
  pickup(pickupId: ID!): Pickups
  transactions: [Transactions]
  transaction(transactionId: ID!): Transactions
  me: Users
}
type Mutation {
  addUsers(name: String!, email: String!, password: String!, isAdmin: Boolean): Auth
  login(email: String!, password: String!): Auth
  addPayments(paymentAmount: Float!, paymentType: String!): Payments
  addPickups(Date: String!, Time: String!, Location: String!, Notes: String!): Pickups
  addTransactions(transaction: String!, quantitySold: Int!, transactionTotal: Float!, paymentType: String!, user_id: ID!, Notes: String): Transactions
 
  removePayments(paymentId: ID!): Payments
  removePickups(pickupId: ID!): Pickups
  removeTransactions(transactionId: ID!): Transactions
  
}
`;

module.exports = typeDefs;