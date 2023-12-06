const express = require("express");
const cors = require('cors')
const transactionPolling = require("./helpers/resilient_db_fetch");

const v1_routes = require("./routes/v1_router");

const app = express();

app.use(cors());
// app.use(transactionPolling());

const PORT = 5501;

app.use(`/api/v1`, v1_routes);

app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
})