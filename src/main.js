// import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import TarotReading from "./js/tarot.js";



function getElements(response){
  console.log(response);

  
  // console.log(response.cards[0].type);
  // const key = response.cards['type'];
  // console.log(key)

  // const majorCards = response.cards;
  // majorCards.filter(checkMajorCards)
  // function checkMajorCards(card) {
  //   if(response.cards.type === "major") {
  //     console.log(card)
  //   }
  // }
  // let newStack = [];
  // for(let i=0; i <= response.cards.length; i++) {
  //   const type = (response.cards[i]['type']);
  //   console.log(type)
    
  //   // console.log(type);
  //   if (type === "major") {
  //     newStack.push(response.cards[i]);
  //     console.log(newStack);
      
      // console.log(res)
      // $('#showName1').text(`${response.cards[0].name}`);
      // $('#showType1').text(`${response.cards[0].type}`);
      // $('#showDescription1').text(`${response.cards[0].desc}`);
    
      // $('#showName2').text(`${response.cards[1].name}`);
      // $('#showType2').text(`${response.cards[1].type}`);
      // $('#showDescription2').text(`${response.cards[1].desc}`);
    
      // $('#showName3').text(`${response.cards[2].name}`);
      // $('#showType3').text(`${response.cards[2].type}`);
      // $('#showDescription3').text(`${response.cards[2].desc}`);
    }
  



// $("button#button").click(function(event){
//   event.preventDefault();
//   let randomCards = parseInt($("input#userInput").val());
//   console.log(randomCards);

TarotReading.getTarot()
  .then(function(response){
    getElements(response);
  });


  