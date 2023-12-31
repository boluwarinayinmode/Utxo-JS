const service_v1 = require("../services/v1_service");

const getAllTransactions = (req, res) => {

  // If they do call service function with the query parameters
  if(req.query.startTime && req.query.endTime) {
      // Check if the request contains a query parameter
    const startTime = new Date(req.query.startTime);
    const endTime = new Date(req.query.endTime);
    const allTransactions = service_v1.getTransactionsByTimeRange(startTime, endTime);
    return res.send({ status: "OK", data: allTransactions });
  }

  console.log("api call 2")
  // Other wise call it with no parameters
  const allTransactions = service_v1.getTransactionsByTimeRange();
  return res.send({ status: "OK", data: allTransactions });
};

const getOneTransaction = (req, res) => {
  const userAddress = req.params.userAddress;
  const transaction = service_v1.getOneTransaction(userAddress);
  res.send({ status: "OK", data: transaction });
};


module.exports = {
  getAllTransactions,
  getOneTransaction
};
