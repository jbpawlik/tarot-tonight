export default class PublicHoliday {
  static async findHoliday() {
    return fetch(`https://thingproxy.freeboard.io/fetch/https://date.nager.at/api/v2/NextPublicHolidaysWorldwide`)
      .then(function(response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .catch(function(error) {
        return error;
      });
  }
}

// { mode: "no-cors", headers: {"Access-Control-Allow-Origin": "*"}}