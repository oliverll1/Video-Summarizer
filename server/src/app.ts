const express = require('express');
const dotenv = require('dotenv');
const cors = require("cors");
const app = express();
const bodyParser = require('body-parser');

dotenv.config();

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:1000}));


const port = process.env.PORT;

app.get('/api', (req, res) => {
  res.send('Hello');
});

const summaryRoutes = require("./routes/summaryRoute");
app.use("/api/summary", summaryRoutes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
