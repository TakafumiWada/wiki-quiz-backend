const express = require("express"),
  app = express(),
  cors = require("cors"),
  bodyParser = require("body-parser"),
  port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser());

const wikiAPIRouter = require("./api/routes");
app.use(wikiAPIRouter);

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
