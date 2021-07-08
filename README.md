# __Tarot Tonight__
### by [John Blalock](https://github.com/simpledimplejohn), [Erika Debelis](https://github.com/ErikaDebelis), [Maxwell Meyer](https://github.com/maxwellmeyer), [James Benjamin Pawlik](https://github.com/jbpawlik), and [Araceli Valdovinos](https://github.com/aracelivaldovinos).

### __Description__
Tarot Tonight is a divination app that deals three cards to the user. It then makes calls to several different APIs to retrieve information related to the cards.


### __Technologies Used__
Tarot Tonight is made with HTML and CSS, using Bootstrap. Service and UI logic is written in JavaScript with help from JQuery. API calls are made with the Fetch API, then parsed from JSON. API calls are made to [Adzuna](https://developer.adzuna.com/), [MediaWiki](https://www.mediawiki.org/wiki/API:Main_page), [restcountries](https://restcountries.eu/), [Pexels](https://www.pexels.com/api/), [Nager Date](https://date.nager.at/Api), and [E Kelen's Tarot API](https://github.com/ekelen/tarot-api). Postman was used to check API functioning.

### __Setup/Installation__
1. Pexels and Adzune require free API developer accounts to use their service. Follow the links above and register for a free account, then generate an API key
2. Download or clone the [repository](http://github.com/jbpawlik/tarot-tonight) to your local machine
3. Navigate to the top level of the directory
4. Create an empty file named .env inside the directory
5. Inside the .env file, write "Adzuna_API_Key=" (without quotes), paste in your Adzuna API key, and save. Then, on a new line, put in "Pexels_API_Key=" and add your Pexels API key.
6. Open the .gitinore file and add .env to the list of ignored files. This will prevent your .env file and API key from being uploaded to GitHub (to protect your key from unauthorized access)
7. Install Node Package Manager before proceeding with the rest of the instructions
8. Open a terminal in the top level of the directory and run "npm install"
9. Run "npm run build"
10. "npm run start" will open the website in your browser
11. Any API errors will be reported in a text field on the site. Information about API errors can be found [here](https://blog.runscope.com/posts/how-to-debug-common-api-errors)

### __Known Bugs / Future Goals__
No bugs have been found or reported. Please contact the authors if you experience poor performance.

Future goals for Tarot Tonight:
1. Connect to an event API to suggest upcoming events.


### __License__
This software is licensed under the [BSD license](license.txt).

[![License](https://img.shields.io/badge/License-BSD%202--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)

Copyright (c) 2021 

### __Contact Information__
Contact the authors: __[John Blalock](), [Erika Debelis](), [Maxwell Meyer](), [James Benjamin Pawlik](james.benjamin.pawlik@gmail.com), [Araceli Valdovinos]()__
