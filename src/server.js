const express = require("express"),
  app = express(),
  cors = require("cors"),
  port = process.env.PORT || 3000;

app.use(cors());

const wikiAPIRouter = require("./api/routes");
app.use(wikiAPIRouter);

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
