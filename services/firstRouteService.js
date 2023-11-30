const data = require("../database/test.json");

//const allTransactions = require()

const getAllTransactions = () => {
  const input = data;

  const users = Array.from(new Set(input.flatMap(entry => entry.inputs.flatMap(input => input.owners_before))));
  
  const transactions = input.flatMap(entry => {
      if (entry.operation === "TRANSFER") {
          const from = entry.inputs[0].owners_before[0];
          const to = entry.outputs[0].public_keys[0];
          const amount = parseInt(entry.outputs[0].amount);

          // Extract timestamp from metadata (if available)
          const timestamp = entry.metadata && entry.metadata.timestamp ? entry.metadata.timestamp : null;

          return [{
              from,
              to,
              amount,
              timestamp,
          }];
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
      transactions: []
  };

  data.forEach(transaction => {
      const inputs = transaction.inputs[0];
      const outputs = transaction.outputs;

      // Check if the transaction has a "TRANSFER" operation
      if (transaction.operation === "TRANSFER") {
          // Check if the user is involved in the transaction
          if (inputs.owners_before.includes(userAddress) || outputs.some(output => output.public_keys.includes(userAddress))) {
              // Add transaction to the result.transactions array
              outputs.forEach(output => {
                  const from = inputs.owners_before[0];
                  const to = output.public_keys[0];
                  const amount = output.amount;

                  // Exclude transactions where both from and to are the same and the user is not involved
                   // Extract timestamp from metadata (if available)
                  const timestamp = transaction.metadata && transaction.metadata.timestamp ? transaction.metadata.timestamp : null;

                  result.transactions.push({ from, to, amount, timestamp });
              });
          }
      }
  });

  return result;

}


// const getOneTransaction = (transactionID) => {

//     const result = {
//         users: [],
//         transactions: []
//       };
    

//     transactionId =  "a534f09b6983492f05c19c8a35024ca7109511f2057ae54b18b6bfd1b6d13af6"

//     const foundTransaction = data.find(transaction => transaction.id === transactionId);

// if (foundTransaction) {
//     const inputs = foundTransaction.inputs[0];
//     const outputs = foundTransaction.outputs;

//     // Add users to the result.users array
//     inputs.owners_before.forEach(owner => {
//     if (!result.users.includes(owner)) {
//         result.users.push(owner);
//       }
//     });

//     outputs.forEach(output => {
//       output.public_keys.forEach(owner => {
//         if (!result.users.includes(owner)) {
//           result.users.push(owner);
//         }
//       });
//     });

//     // Add transaction to the result.transactions array
//     outputs.forEach(output => {
//       const from = inputs.owners_before[0];
//       const to = output.public_keys[0];
//       const amount = output.amount;

//       result.transactions.push({ from, to, amount });
//     });
//   }

//   return result;

// }

module.exports = {
    getAllTransactions,
    getOneTransaction,
}

