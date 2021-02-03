# Global Goals
![Leave No One Behind](https://cdn-images-1.medium.com/max/1600/1*LaS9M0ZeuqzDyxmup2YtfA.png "")

## Overview

At Samsung Internet, we believe that the web is a powerful place to share information and use it for good, therefore we’ve decided to bring Global Goals to the web, making it a cross-platform web app and available for everybody. Even further, we believe that users deserve a good experience regardless of the platform they are using or the connection available, say hello to Samsung Global Goals PWA!

## Building

Pre-requisites: node installed and [Firebase Cli](https://firebase.google.com/docs/cli#windows-standalone-binary).
Set up the .env file properly.

```bash
# Clone this repository
$ git clone https://github.com/SamsungInternet/globalgoals.git
# Install package.json
$ cd functions
$ npm install
```

## Developing

### Local

```bash
# Run the project locally
$ cd global goals
$ node app.js
```

Then open [http://localhost:8080](http://localhost:8080) in your browser.

### Server

```bash
# Run the project with Firebase Hosting
$ cd functions
$ node index.js
```

### Deploying

```bash
$ firebase deploy
```

Depending on your configuration this will deploy the code to the proper environment: dev, stage, prod

## Wiki

The following articles are related to the project and the technologies used: Progressive Web Apps, One UI, Firebase etc.
- [Intro to Samsung Global Goals Web Debut](https://medium.com/samsung-internet-dev/samsung-the-global-goals-web-debuts-f8cdae4ec21d)
- [One UI Web](bhttps://oneuiweb.dev/#/)
- [Build your first PWA] (https://medium.com/samsung-internet-dev/pwa-series-hands-on-create-your-first-pwa-step-by-step-5bb7a6605349)
- [Using Firebase to host Node Projects and Functions] (https://www.youtube.com/watch?v=LOeioOKUKI8)
- [Progressive Web Apps Documentation by MDN] (https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps])







