const puppeteer = require("puppeteer");
// importing the fs module
const fs = require("fs");

async function start() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.pathehome.com/fr/fr/genre");

  const movies = await page.evaluate(() => {
    let array = [];
    const divs = document.querySelectorAll(".group\\/slot.relative");
    for (let genre = 0; genre < divs.length; genre++) {
      const movies = divs[genre].querySelector(
        '[data-test="inner-list"]'
      ).children;
      for (let i = 0; i < 10; i++) {
        const link = movies[i].querySelector("a");
        console.log(link);
        const img = link.querySelector("img");
        const title = Array.from(link.querySelectorAll("div"))[1].textContent;

        const movie = {
          link: link.href,
          img: img.src,
          title: title,
        };

        array.push(movie);
      }
    }
    return array;
  });

  for (let i = 0; i < movies.length; i++) {
    await page.goto(`${movies[i].link}`);
    const movies_details = await page.evaluate(() => {
      const details = document.querySelector(".relative");
      const ps = Array.from(details.querySelectorAll("p"));
      const year = ps[1].textContent;
      const genre = ps[2].textContent;
      const info = ps[4].textContent;
      const movie_details = { year: year, genre: genre, info: info };
      return movie_details;
    });

    movies[i] = { ...movies[i], ...movies_details };
  }
  const data = JSON.stringify(movies);

  // writing the JSON string content to a file
  fs.writeFile("data.json", data, (error) => {
    if (error) {
      console.error(error);
    }

    console.log("data.json written correctly");
  });
  await browser.close();
}
start();
