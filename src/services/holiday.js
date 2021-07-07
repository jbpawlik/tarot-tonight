export default class PublicHoliday {
  static async findHoliday() {
    return fetch(`https://date.nager.at/api/v2/NextPublicHolidaysWorldwide`, { mode: "no-cors", headers: {"*": "Access-Control-Allow-Origin"}})
      .then(function(response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        console.log(response);
        console.log(response.localName);
        console.log(response.name);
        return response.json();
      })
      .catch(function(error) {
        return error;
      });
  }
}