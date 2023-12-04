const express = require("express");
const router = express.Router();
const firstRouteService = require("../services/firstRouteService");

const getAllTransactions = (req, res) => {
  const allTransactions = firstRouteService.getTransactionsByTimeRange();
  res.send({ status: "OK", data: allTransactions });
};

const getOneTransaction = (req, res) => {
  const userAddress = req.params.userAddress;
  const transaction = firstRouteService.getOneTransaction(userAddress);
  res.send({ status: "OK", data: transaction });
};

const getTransactionsByTimeRange = (req, res) => {
  const startTime = new Date(req.query.startTime);
  const endTime = new Date(req.query.endTime);
  
  const transaction = firstRouteService.getTransactionsByTimeRange(startTime, endTime);
  res.send({ status: "OK", data: transaction });
};


module.exports = {
  getAllTransactions,
  getOneTransaction,
  getTransactionsByTimeRange
};
