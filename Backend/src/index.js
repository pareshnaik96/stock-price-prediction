const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const route = require("./Routes/route")


const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/',route);

app.listen(process.env.PORT || 4000, () => {
    console.log(`Server is running on port ${process.env.PORT || 4000}`);
});