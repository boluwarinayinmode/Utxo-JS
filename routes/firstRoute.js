const express = require('express');
const router = express.Router();
const firstRouteController = require ('../controllers/firstRouteController')

router.get("/", firstRouteController.getAllTransactions)

router.get("/:userAddress", firstRouteController.getOneTransaction)


module.exports = router;