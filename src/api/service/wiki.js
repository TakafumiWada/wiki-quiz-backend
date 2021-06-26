const wiki = require("wikijs").default;

module.exports.getArticleData = async function() {
  let accessCount = 0;
  let randomPage = "";
  let page = {};
  let contents = [];
  let words = [];
  let articleValid = false;
  while (!articleValid) {
    //ランダムで記事を取得
    randomPage = await wiki({
      apiUrl: "http://ja.wikipedia.org/w/api.php",
    }).random();
    //ランダムで取得した記事の詳細を取得
    page = await wiki({
      apiUrl: "http://ja.wikipedia.org/w/api.php",
    }).page(randomPage[0]);
    contents = await page.content();
    words = await page.links();
    articleValid = contents.length > 2;
    if (articleValid) articleValid = contents[0].content.length > 80;
    console.log(articleValid);
    if (accessCount++ > 20) throw "loop error";
  }
  return {
    title: randomPage[0],
    topic: contents[0],
    contents: contents,
    categories: await page.categories(),
    words: words,
  };
};
