const db = require('../config/connection');
// const cleanDB = require('./cleanDB');

const { Payments, Pickups, Transactions, Users  } = require('../models');
const PaymentsData = require('./Payments.json');
const PickupsData = require('./Pickups.json');
const TransactionsData = require('./Transactions.json');
const UsersData = require('./Users.json');

db.once('open', async () => {
  // await cleanDB('Payment', 'Payments');
  // await cleanDB('Pickup', 'Pickups');
  // await cleanDB('Transaction', 'Transactions');
  // await cleanDB('User', 'Users');
  await Users.deleteMany({});
  await Users.insertMany(UsersData);

  console.log('all done!');
  process.exit(0);
});
