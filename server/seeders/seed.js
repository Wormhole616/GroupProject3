const db = require('../config/connection');
const cleanDB = require('./cleanDB');

const { Payments, Pickups, Transactions, Users  } = require('../models');
const Payments = require('./Payments.json');
const Pickups = require('./Pickups.json');
const Transactions = require('./Transactions.json');
const Users = require('./Users.json');

db.once('open', async () => {
  await cleanDB('Payment', 'Payments');
  await cleanDB('Pickup', 'Pickups');
  await cleanDB('Transaction', 'Transactions');
  await cleanDB('User', 'Users');


  console.log('all done!');
  process.exit(0);
});
