

const { Payments, Pickups, Transactions, Users } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return Users.find().populate('payments').populate('pickups').populate('transactions');
    },
    user: async (parent, { usersId }) => {
      return Users.findOne({ _id: usersId }).populate('payments').populate('pickups').populate('transactions');
    },
    payments: async () => {
      return Payments.find();
    },
    payment: async (parent, { paymentsId }) => {
      return Payments.findOne({ _id: paymentsId });
    },
    pickups: async () => {
      return Pickups.find()
        .populate('user')  
      ;
    },
    pickup: async (parent, { usersId }) => {
      return Pickups.findOne({ _id: usersId });
    },
    transactions: async () => {
      return Transactions.find();
    },
    transaction: async (parent, { userId }) => {
      return Transactions.findOne({ _id: userId });
      
    },
    me: async (parent, args, context) => {
      console.log(context.user)
      if (context.user) {
        const loggedInUserData =  Users.findOne({ _id: context.user._id })
        // .populate('payments')
        .populate('pickups')
        .populate('transactions');

        return loggedInUserData;
      }
      throw AuthenticationError;
    }
  },

  Mutation: {
    addUsers: async (parent, { name, email, password, isAdmin }) => {
      const user = await Users.create({ name, email, password, isAdmin });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await Users.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },

    addPayments: async (parent, { paymentAmount, paymentType, Notes }) => {
      if (context.user) {
        const payment = await Payments.create({ paymentAmount, paymentType, Notes });
        await Users.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { payments: payment._id } }
        );
        return payment;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addPickups: async (parent, { Date, Time, Location, Notes }, context) => {
      if (context.user) {
        const pickUpDate = await Pickups.create({ Date, Time, Location, Notes, user: context.user._id});
        await Users.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { pickups: pickUpDate._id } }
        );
        return pickUpDate;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addTransactions: async (parent, { transaction, quantitySold, transactionTotal, paymentType, Notes, user_id }) => {
      // if (context.user) {
        const newTransaction = await Transactions.create({ transaction, quantitySold, transactionTotal, paymentType, Notes, user: context.user._id });
        await Users.findOneAndUpdate(
          // { _id: context.user._id },
          { _id: user_id },
          { $addToSet: { transactions: newTransaction._id } }
        );
        return newTransaction;
      // }
      // throw new AuthenticationError('You need to be logged in!');
    },
    removePayments: async (parent, { paymentId }) => {
      if (context.user) {
        const payment = await Payments.findOneAndDelete({ _id: paymentId });
        await Users.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { payments: payment._id } }
        );
        return payment;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removePickups: async (parent, { PickupsID }) => {
      if (context.user) {
        const pickUpDate = await Pickups.findOneAndDelete({ _id: PickupsID });
        await Users.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { pickups: Pickups._id } }
        );
        return pickUpDate;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeTransactions: async (parent, { transactionId }) => {
      if (context.user) {
        const transaction = await Transactions.findOneAndDelete({ _id: transactionId });
        await Users.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { transactions: transaction._id } }
        );
        return transaction;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
    


