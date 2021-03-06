const express = require("express");
const router = express.Router();
const { getArticleData, searchArticleData } = require("../service/wiki");

router.get("/article/get", async (req, res) => {
  try {
    const data = await getArticleData(req.headers["user-agent"]);
    data.categories = data.categories.map((category) => category.substr(9));
    res.send(data);
  } catch (e) {
    if (e == "loop error") {
      res.status(511).send(e);
    } else {
      console.error(e);

      res.status(503).send(e);
    }
  }
});

router.get("/article/search", async (req, res) => {
  try {
    const data = await searchArticleData(req.query.text);
    res.send(data.results[0]);
  } catch (e) {
    console.log(e);
    res.status(503).send(e);
  }
});

module.exports = router;
