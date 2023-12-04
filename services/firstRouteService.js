const data = require("../database/test.json");
const rangeData = require("../database/rangeTestData.json");

//const allTransactions = require()

const getAllTransactions = () => {
  const input = data;

  const users = Array.from(
    new Set(
      input.flatMap((entry) =>
        entry.inputs.flatMap((input) => input.owners_before)
      )
    )
  );

  const transactions = input.flatMap((entry) => {
    if (entry.operation === "TRANSFER") {
      const from = entry.inputs[0].owners_before[0];
      const to = entry.outputs[0].public_keys[0];
      const amount = parseInt(entry.outputs[0].amount);

      // Extract timestamp from metadata (if available)
      const timestamp =
        entry.metadata && entry.metadata.timestamp
          ? entry.metadata.timestamp
          : null;

      return [
        {
          from,
          to,
          amount,
          timestamp,
        },
      ];
    } else {
      return [];
    }
  });

  return {
    users,
    transactions,
  };
};

const getOneTransaction = (userAddress) => {
  const result = {
    users: [userAddress],
    transactions: [],
  };

  data.forEach((transaction) => {
    const inputs = transaction.inputs[0];
    const outputs = transaction.outputs;

    // Check if the transaction has a "TRANSFER" operation
    if (transaction.operation === "TRANSFER") {
      // Check if the user is involved in the transaction
      if (
        inputs.owners_before.includes(userAddress) ||
        outputs.some((output) => output.public_keys.includes(userAddress))
      ) {
        // Add transaction to the result.transactions array
        outputs.forEach((output) => {
          const from = inputs.owners_before[0];
          const to = output.public_keys[0];
          const amount = output.amount;

          // Exclude transactions where both from and to are the same and the user is not involved
          // Extract timestamp from metadata (if available)
          const timestamp =
            transaction.metadata && transaction.metadata.timestamp
              ? transaction.metadata.timestamp
              : null;

          result.transactions.push({ from, to, amount, timestamp });
        });
      }
    }
  });

  return result;
};

const getTransactionsByTimeRange = (startTime, endTime) => {
  const result = {
    users: [],
    transactions: [],
  };

  console.log(rangeData);

  const transactions = rangeData.data.data.transactions;
  // const startTime = new Date("2023-11-15T00:00:00Z"); // Adjust to the start of the generated data
  // const endTime = new Date("2023-11-30T23:59:59Z"); // Adjust to the end of the generated data

  

  
  transactions.forEach((transaction) => {
    const from = transaction.from;
    const to = transaction.to;
    const amount = transaction.amount;
    const timestamp = new Date(transaction.timestamp);
    // const timestamp = transaction.timestamp;

    // Add users to the result.users array
    if (!result.users.includes(from)) {
      result.users.push(from);
    }

    if (!result.users.includes(to)) {
      result.users.push(to);
    }

    if (timestamp >= startTime && timestamp < endTime) {
      result.transactions.push({
        from,
        to,
        amount,
        timestamp: transaction.timestamp,
      });
    }

    //  const timestampString = timestamp.toISOString();
    //  const startTimeString = startTime.toISOString();
    //  const endTimeString = endTime.toISOString();

    // // Add transaction to the result.transactions array if it falls within the specified time range
    // // if (timestamp >= startTime && timestamp <= endTime) {
    // //   result.transactions.push({ from, to, amount, timestamp });

    // // } else {
    // //   console.log("Transaction outside time range:", transaction);
    // //   console.log("Timestamp:", timestamp);
    // //   console.log("Start Time:", startTime);
    // //   console.log("End Time:", endTime);
    // // }
    //  if (timestampString >= startTimeString && timestampString <= endTimeString) {
    //     result.transactions.push({ from, to, amount, timestamp });
    //  }
  });

  return result;
};
// // Example usage
// const transactions = data; // Your transaction data
// const startTime = "2023-11-21T15:49:19";
// const endTime = "2023-11-21T15:49:21";

// const result = getTransactionsByTimeRange(transactions, startTime, endTime);
// console.log(result);

const generateTestData = () => {
  const transactions = [];
  const users = [];

  const startTime = new Date("2023-11-01T00:00:00Z");
  const endTime = new Date("2023-11-30T23:59:59Z");
  const numTransactions = 150;

  for (let i = 0; i < numTransactions; i++) {
    const fromUser = `user${Math.floor(Math.random() * 10) + 1}`;
    const toUser = `user${Math.floor(Math.random() * 10) + 1}`;

    if (!users.includes(fromUser)) {
      users.push(fromUser);
    }

    if (!users.includes(toUser)) {
      users.push(toUser);
    }

    const timestamp = new Date(
      startTime.getTime() +
        Math.random() * (endTime.getTime() - startTime.getTime())
    ).toISOString();

    transactions.push({
      from: fromUser,
      to: toUser,
      amount: Math.floor(Math.random() * 10) + 1,
      timestamp,
    });
  }

  return {
    data: {
      users,
      transactions,
    },
  };
};

module.exports = {
  getAllTransactions,
  getOneTransaction,
  generateTestData,
  getTransactionsByTimeRange,
};
