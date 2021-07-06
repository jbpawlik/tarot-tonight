export default class SearchAdzuna {
  static async getJobs(search) {
    return fetch(`https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=cd92142a&app_key=${process.env.Adzuna_API_KEY}&what=${search}`)
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

// https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=cd92142a&app_key=616b513cf09cef57bedd2b2357894e9a&what=sword