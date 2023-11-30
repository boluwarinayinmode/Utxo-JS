const express = require("express");
const  cors = require('cors')

const firstRouter = require("./routes/firstRoute");


const app = express();

app.use(cors());

const PORT = 5501;

app.use(`/api/firstRoute`, firstRouter);

app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`)
})