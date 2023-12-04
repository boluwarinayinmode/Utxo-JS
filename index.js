const express = require("express");
const  cors = require('cors')

const v1_routes = require("./routes/v1_router");

const app = express();

app.use(cors());

const PORT = 5501;

app.use(`/api/v1`, v1_routes);

app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
})