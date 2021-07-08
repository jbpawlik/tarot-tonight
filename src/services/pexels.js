export default class Pexels {
  static async imageSearch(search) {
    return fetch(`https://thingproxy.freeboard.io/fetch/https://api.pexels.com/v1/search?query=${search}&orientation=landscape`, {headers: {"authorization": "563492ad6f91700001000001720f4bb1aa3546b09b575052ac5cd98f"}})
      .then(function(response) {
        return response.json();
      })
      .catch(function(error){console.log(error);});
  }
}