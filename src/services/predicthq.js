export default class PredictHQ {
  static async findEvents(search) {
    return fetch(`https://api.predicthq.com/v1/events/?q=${search}`, {headers: {"authorization": "Bearer wzLs7amJCTKdXTxpTAZ9hlLM35V9HB0ybJj-jxj9"}})
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