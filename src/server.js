const express = require("express"),
  app = express(),
  cors = require("cors"),
  bodyParser = require("body-parser"),
  ipfilter = require("express-ipfilter").IpFilter,
  port = process.env.PORT || 3000,
  ips = ["172.217.175.116"];

app.use(cors());
app.use(bodyParser());
app.use(ipfilter(ips, { mode: "allow" }));

const wikiAPIRouter = require("./api/routes");
app.use(wikiAPIRouter);

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
