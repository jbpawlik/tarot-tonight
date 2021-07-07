import SearchAdzuna from "./services/adzuna";
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import TarotReading from "./js/tarot.js";
import PublicHoliday from "./services/holiday.js";
import Wiki from "./services/wiki.js";
import Pexels from './services/pexels';

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

  $("#showCard1").html(`<img src=result1.name_short`);
  $("#showCard2").html(`<img src=result2.name_short`);
  $("#showCard3").html(`<img src=result3.name_short`);

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


function displayWiki(response) {
  $('#card1Wiki').html(response.displaytitle + "<br><img src=" + response.thumbnail.source + "><br>" + response.extract + "<br>" + "<a href='" + response.content_urls.desktop.page + "'>More</a>");
}

Wiki.randomWiki()
  .then(function(response) {
    if (response instanceof Error) {
      throw Error(response.message);
    }
    displayWiki(response);
  });

function displayHoliday(response) {
  let num = Math.floor(Math.random() * (10 - 1) + 1);
  let search = response[num].localName;
  Pexels.imageSearch(search)
    .then(function(response) {
      let link = response.photos[num].src.medium;
      sessionStorage.setItem('link', link);
      return link;
    });
  let link = sessionStorage.getItem('link');
  $('#card2Holiday').html(response[num].localName + "<br><img src=" + link + "><br>" + response[num].name + "<br>" + response[num].countryCode);
}

PublicHoliday.findHoliday()
  .then(function(response) {
    if (response instanceof Error) {
      throw Error(response.message);
    }
    displayHoliday(response);
  })
  .catch(function(error) {
    console.log(error);
  });

function displayJob(response) {
  $('#card3Job').html(response.results[0].title + "<br>" + response.results[0].location.area[0] + "<a href='" + response.results[0].redirect_url + "'><br>More</a>");
}

let search = 'sword';

SearchAdzuna.getJobs(search)
  .then(function(response) {
    if (response instanceof Error) {
      throw Error(response.message);
    }
    displayJob(response);
  })
  .catch(function(error) {
    console.log(error);
    //display errors function
  });
