const express = require("express"),
  app = express(),
  port = process.env.PORT || 3000;

const wikiAPIRouter = require("./api/routes/wikiAPI");
app.use(wikiAPIRouter);

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
