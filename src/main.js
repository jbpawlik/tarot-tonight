import SearchAdzuna from "./services/adzuna";
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import TarotReading from "./js/tarot.js";
import PublicHoliday from "./services/holiday.js";
import Wiki from "./services/wiki.js";
import Pexels from './services/pexels';
import RestCountries from './services/countrycode';



function getElements(response) {
  const array = response.cards;
  const result1 = getRandomItem(array);
  const result2 = getRandomItem(array);
  const result3 = getRandomItem(array);
  sessionStorage.setItem('result3', result3.meaning_up); //I need this in a later function - Ben

  let img1 = (result1.name_short + '.png');
  $('#showPic1').html("<img src='assets/images/" + img1 + "' width='250' height='auto'></img>");
  let img2 = (result2.name_short + '.png');
  $('#showPic2').html("<img src='assets/images/" + img2 + "' width='250' height='auto'></img>");
  let img3 = (result3.name_short + '.png');
  $('#showPic3').html("<img src='assets/images/" + img3 + "' width='250' height='auto'></img>");

  $("#showName1").text(result1.name);
  $("#showName2").text(result2.name);
  $("#showName3").text(result3.name);

  // $("#showDescription1").text(result1.desc);
  // $("#showDescription2").text(result2.desc);
  // $("#showDescription3").text(result3.desc);

  $("#showMeaning1").text(result1.meaning_up);
  $("#showMeaning2").text(result2.meaning_up);
  $("#showMeaning3").text(result3.meaning_up);
}

function getRandomItem() {
  let response = JSON.parse(sessionStorage.getItem('major arcana'));
  const randomIndex = Math.floor(Math.random()* response.cards.length);
  const item = response.cards[randomIndex];
  return item;
}

$('#sub').click(function(event) {
  event.preventDefault();

  TarotReading.getTarot()
    .then(function(response) {
      let majorArcana = JSON.stringify(response);
      sessionStorage.setItem('major arcana', majorArcana);
    });

  let response = JSON.parse(sessionStorage.getItem('major arcana'));


  getElements(response);
  $('#cards').show();
  $('#past').show();
  $('#present').show();
  $('#future').show();
});

$('#past').click(function(event) {
  event.preventDefault();

  function displayWiki(response) {
    $('#card1Wiki').html(response.displaytitle + "<br><img src=" + response.thumbnail.source + "><br>" + response.extract + "<br>" + "<a href='" + response.content_urls.desktop.page + "' width=300px>More</a>");
  }

  Wiki.randomWiki()
    .then(function(response) {
      if (response instanceof Error) {
        throw Error(response.message);
      }
      displayWiki(response);
    });
  $('#pastLife').show();
});

$('#present').click(function(event) {
  event.preventDefault();

  function displayHoliday(response) {
    let num = Math.floor(Math.random() * (10 - 1) + 1);
    let search = response[0].localName;
    Pexels.imageSearch(search)
      .then(function(response) {
        let link = response.photos[num].src.medium;
        sessionStorage.setItem('link', link);
        return link;
      });
    let countryCode = response[0].countryCode;
    RestCountries.convertCode(countryCode)
      .then(function(response) {
        let country = response.name;
        sessionStorage.setItem('country', country);
        return country;
      });
    let link = sessionStorage.getItem('link');
    let country = sessionStorage.getItem('country');
    $('#card2Holiday').html('Celebrate the holiday of  ' + response[0].localName + "<br><img src=" + link + " width=300px><br>" + response[0].name + "<br>" + country);
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
  $('#presentReality').show();
});

$('#future').click(function(event) {
  event.preventDefault();

  function displayJob(response) {
    let num = Math.floor(Math.random() * (10 - 1) + 1);
    let search = response.results[0].title;
    Pexels.imageSearch(search)
      .then(function(response) {
        let link = response.photos[num].src.medium;
        sessionStorage.setItem('link2', link);
        return link;
      });
    let link = sessionStorage.getItem('link2');
    $('#card3Job').html(response.results[0].title + "<br><img src=" + link + "><br>" + response.results[0].location.area[0] + "<a href='" + response.results[0].redirect_url + "' width=300px><br>More</a>");
  }

  let result3 = sessionStorage.getItem('result3');
  let search = result3;

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


  $('#futurePurpose').show();
});






