const cheerio = require("cheerio");
const axios = require("axios");
const book_data = [];

const url =
  "https://www.amazon.com/s?k=cs+book&crid=15OA734O8RYSJ&sprefix=cs+bo%2Caps%2C732&ref=nb_sb_noss_2";

async function getData() {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const book_info = [];
    $(".s-result-item").each(function (i, elem) {
      const title = $(this)
        .find(".a-size-medium.a-color-base.a-text-normal")
        .text();
      const author = $(this)
        .find(
          "a-size-base a-link-normal s-underline-text s-underline-link-text s-link-style"
        )
        .text();
      book_info.push({
        title: title,
        author: author,
      });
    });

    console.log(book_info);
  } catch (error) {
    console.error(error);
  }
}

getData();
