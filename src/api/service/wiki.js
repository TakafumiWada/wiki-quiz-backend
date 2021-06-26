const wiki = require("wikijs").default;
const LIMITED_WORD_LENGTH = 18;
const SELECTED_WORDS_NUMBER = 9;

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

    words = await page.links();
    articleValid =
      words.filter((word) => {
        return word.length <= LIMITED_WORD_LENGTH;
      }).length >= SELECTED_WORDS_NUMBER;

    console.log(articleValid);
    if (accessCount++ > 20) throw "loop error";
  }
  contents = await page.content();
  return {
    title: randomPage[0],
    topic: contents[0],
    contents: contents,
    categories: await page.categories(),
    words: words,
    image: await page.mainImage(),
  };
};

module.exports.searchArticleData = async function(text) {
  const searchResults = await wiki({
    apiUrl: "http://ja.wikipedia.org/w/api.php",
  }).search(text);
  return searchResults;
};
