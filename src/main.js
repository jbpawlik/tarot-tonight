import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import TarotReading from "./js/tarot.js";
import PublicHoliday from "./services/holiday.js";
import Wiki from "./services/wiki.js";
import Pexels from './services/pexels';
import RestCountries from './services/countrycode';
// import SearchAdzuna from "./services/adzuna"; //temporarily deprecated
import PredictHQ from './services/predicthq';

function getElements(response) {
  const array = response.cards;
  let result1 = getRandomItem(array);
  let result2 = getRandomItem(array);
  let result3 = getRandomItem(array);
  sessionStorage.setItem('result3', result3.name);

  let img1 = (result1.name_short + '.png');
  $('#showPic1').html("<img src='assets/images/" + img1 + "' width='250' height='auto'></img>");
  let img2 = (result2.name_short + '.png');
  $('#showPic2').html("<img src='assets/images/" + img2 + "' width='250' height='auto'></img>");
  let img3 = (result3.name_short + '.png');
  $('#showPic3').html("<img src='assets/images/" + img3 + "' width='250' height='auto'></img>");

  $("#showName1").text(result1.name);
  $("#showName2").text(result2.name);
  $("#showName3").text(result3.name);

  //Not used at present, may need for future
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


//Card Draw - Tarot API call
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


//Past Life - MediaWiki API Call
$('#past').click(function(event) {
  event.preventDefault();

  function displayWiki(response) {
    $('#card1Wiki').html(response.displaytitle + "<br><br><img src=" + response.thumbnail.source + "><br><br>" + response.extract + "<br><br>" + "<a href='" + response.content_urls.desktop.page + "' width=300px>More</a>");
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

//Present Reality - Nager Date, Pexels, restcountries API calls
$('#present').click(function(event) {
  event.preventDefault();

  function displayHoliday(response) {
    let search = response[0].localName;
    Pexels.imageSearch(search)
      .then(function(response) {
        let link = response.photos[0].src.medium;
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
    $('#card2Holiday').html('<br>Celebrate the holiday of  <br><br>' + response[0].localName + "<br><br><img src=" + link + " width=300px><br><br>" + response[0].name + "<br><br>" + country);
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


//Future Purpose - Predict HQ, Pexels API calls
$('#future').click(function(event) {
  event.preventDefault();

  function displayEvent(response) {
    let search = response.results[0].title;
    let num = Math.floor(Math.random() * (10 - 1) + 1);
    Pexels.imageSearch(search)
      .then(function(response) {
        let link = response.photos[num].src.medium;
        sessionStorage.setItem('link2', link);
        return link;
      });
    let link = sessionStorage.getItem('link2');
    $('#card3Job').html(response.results[0].title + "<br><br><img src='" + link + "' width=300px><br><br>" + response.results[0].description + '<br><br>' + response.results[0].country);
  }

  let result3 = sessionStorage.getItem('result3');
  let search = result3;

  PredictHQ.findEvents(search)
    .then(function(response) {
      if (response instanceof Error) {
        throw Error(response.message);
      }
      displayEvent(response);
    })
    .catch(function(error) {
      console.log(error);
    });
  $('#futurePurpose').show();
});

// Future Purpose - Adzuna, Pexels API calls
//Job search function temporarily removed because Adzuna API became unavailable
// $('#future').click(function(event) {
//   event.preventDefault();

//   function displayJob(response) {
//     let num = Math.floor(Math.random() * (10 - 1) + 1);
//     let search = response.results[0].title;
//     Pexels.imageSearch(search)
//       .then(function(response) {
//         let link = response.photos[num].src.medium;
//         sessionStorage.setItem('link2', link);
//         return link;
//       });
//     let link = sessionStorage.getItem('link2');
//     $('#card3Job').html(response.results[0].title + "<br><br><img src=" + link + " width=300px><br><br>" + response.results[0].location.area[0] + "<a href='" + response.results[0].redirect_url + "' ><br><br>More</a>");
//   }

//   let result3 = sessionStorage.getItem('result3');
//   let search = result3;

//   SearchAdzuna.getJobs(search)
//     .then(function(response) {
//       if (response instanceof Error) {
//         throw Error(response.message);
//       }
//       displayJob(response);
//     })
//     .catch(function(error) {
//       console.log(error);
//     });

//   $('#futurePurpose').show();
// });