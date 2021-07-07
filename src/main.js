// import SearchAdzuna from "./services/adzuna";
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import TarotReading from "./js/tarot.js";
import PublicHoliday from "./services/holiday.js";
import Wiki from "./services/wiki.js";

TarotReading.getTarot()
  .then(function(response){
    getElements(response);
    let majorArcana = JSON.stringify(response);
    sessionStorage.setItem('major arcana', majorArcana);
  });

let majorArcana = JSON.parse(sessionStorage.getItem('major arcana'));
console.log(majorArcana);

function getElements(response) {
  const array = response.cards;
  const result1 = getRandomItem(array);
  const result2 = getRandomItem(array);
  const result3 = getRandomItem(array);

  $("#showCard1").html(`<img src= ../assets/images/${result1.name_short}.png>`);
  $("#showCard2").html(`<img src= ../assets/images/${result2.name_short}.png>`);
  $("#showCard3").html(`<img src= ../assets/images/${result3.name_short}.png>`);

  console.log("image:",result1.name_short);
  console.log("image string", `<img src= src/assets/images/${result1.name_short}.png>`)

  $("#showName1").text(result1.name);
  $("#showName2").text(result2.name);
  $("#showName3").text(result3.name);

  $("#showDescription1").text(result1.desc);
  $("#showDescription2").text(result2.desc);
  $("#showDescription3").text(result3.desc);

  $("#showMeaning1").text(result1.meaning_up);
  $("#showMeaning2").text(result2.meaning_up);
  $("#showMeaning3").text(result3.meaning_up);

  function getRandomItem() {
    const randomIndex = Math.floor(Math.random()* response.cards.length);
    const item = response.cards[randomIndex];
    return item;
  }
}



// let search = 'servitude';
// console.log(search);




// SearchAdzuna.getJobs(search)
//   .then(function(response) {
//     if (response instanceof Error) {
//       throw Error(response.message);
//     }
//     console.log(response.results[0].title);
//     console.log(response.results[0].location.area[0]);
//     console.log(response.results[0].redirect_url);
//   })
//   .catch(function(error) {
//     console.log(error);
//     //display errors function
//   });

PublicHoliday.findHoliday()
  .then(function(response) {
    if (response instanceof Error) {
      throw Error(response.message);
    }
    console.log(response[0].localName);
    console.log(response[0].name);
    console.log(response[0].countryCode);
  })
  .catch(function(error) {
    console.log(error);
  });

Wiki.randomWiki()
  .then(function(response) {
    if (response instanceof Error) {
      throw Error(response.message);
    }
    console.log(response);
    console.log(response.thumbnail.source);
    console.log(response.displaytitle);
    console.log(response.extract);
    console.log(response.content_urls.desktop.page);
  });