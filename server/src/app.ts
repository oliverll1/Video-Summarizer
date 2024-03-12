import express from "express";
import dotenv  from "dotenv";
import cors from "cors";
import bodyParser from 'body-parser';

const app = express();


dotenv.config();

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:1000}));


const port = process.env.PORT;

const transcribeRoutes = require("./routes/transcriptRoutes");
app.use("/api/transcript", transcribeRoutes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
