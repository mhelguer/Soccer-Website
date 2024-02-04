# ember-quickstart

This README outlines the details of collaborating on this Ember application.
This application is a mock website for a soccer league where users can view the league's schedule, team standings for multiple divisions, and login to view their team's roster.
The backend uses MySQL and NodeJS and the frontend uses EmberJS and SCSS.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://cli.emberjs.com/release/)
* [Google Chrome](https://google.com/chrome/)

## Installation

* `git clone <repository-url>` this repository
* `cd ember-quickstart`
* `npm install`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Linting

* `npm run lint`
* `npm run lint:fix`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Run `npm install` and start your mysql server on port 3000. Use the terminal in Visual Studio Code to navigate to `ember-quickstart` to be able to use the `ember s` command to run the application.
Use another terminal tab to navigate to `ember-quickstart/app/backend` to run `node app.js` so that the application will connect to your mysql server.
In your browser, go to `http://localhost:4200/` to view the home page of the website.

## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://cli.emberjs.com/release/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
