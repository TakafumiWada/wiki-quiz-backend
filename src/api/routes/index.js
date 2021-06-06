module.exports = function(app) {
  const question = require("../controllers");

  app.router("/qustion").get(question.getQuestion);
};
