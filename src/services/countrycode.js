export default class RestCountries {
  static async convertCode(countryCode) {
    return fetch(`https://restcountries.eu/rest/v2/alpha/${countryCode}`)
      .then(function(response) {
        return response.json();
      })
      .catch(function(error){console.log(error);});
  }
}