export default class Wiki {
  static async randomWiki() {
    return fetch(`https://thingproxy.freeboard.io/fetch/https://en.wikipedia.org/api/rest_v1/page/random/summary`)
      .then(function(response) {
        return response.json();
      })
      .catch(function(error){console.log(error);});
  }
}

// export default class Wiki {
//   static async randomWiki() {
//     return fetch(`https://thingproxy.freeboard.io/fetch/https://en.wikipedia.org/api/rest_v1/page/random/summary`)
//       .then(function(response) {
//         return response.json();
//       })
//       .then(function(response) {
//         let randoms = response.query.random;
//         for (let r in randoms) {
//           console.log(randoms[r]);
//         }
//         return randoms;
//       })
//       .catch(function(error){console.log(error);});
//   }
// }

// {headers: {"*": "Access-Control-Allow-Origin"}}

// https://thingproxy.freeboard.io/fetch/https://en.wikipedia.org/w/api.php?action=query&rvprop=content&prop=info&inprop=url&format=json&list=random&rnlimit=1