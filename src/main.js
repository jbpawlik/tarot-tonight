import SearchAdzuna from "./services/adzuna";
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

let search = 'servitude';

$

SearchAdzuna.getJobs(search)
  .then(function(response) {
    if (response instanceof Error) {
      throw Error(response.message);
    }
    console.log(response.results[0].title);
    console.log(response.results[0].location.area[0]);
    console.log(response.results[0].redirect_url);
  })
  .catch(function(error) {
    console.log(error);
    //display errors function
  });