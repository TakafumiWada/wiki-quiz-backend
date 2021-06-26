const express = require("express");
const router = express.Router();
const { getArticleData } = require("../service/wiki");

router.get("/article/get", async (req, res) => {
  try {
    const data = await getArticleData();
    data.categories = data.categories.map((category) => category.substr(9));
    res.send(data);
  } catch (e) {
    if (e == "loop error") {
      res.status(511).send(e);
    } else {
      res.send(e);
    }
  }
});

module.exports = router;
