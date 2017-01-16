#Journaly
Welcome to Journaly.
A progressive web app, build with React Redux and firebase.
In this app the user can create a 'Journey', for example when they are traveling.
To this 'Journey' the user can add entries. An entry needs to be filled with a location (users current geolocation), a photo (using the video api of the browser) and a description.
When offline or not logged in the user can still check the recent viewed Journeys in the application. (By navigating to journeys on the home screen)


# Installing
Clone the repo, and run

```sh
npm install
```

# Running
To start the application in development mode, run the following command
```sh
npm run serve
```
To start the application in production mode, run the following command
```sh
npm run serve-production
```

# Functionality
All data is stored in firebase and also in the indexed db of the browser.
The app has an manifest.json to make it a usable 'progressive web application'
The device functionalities I used are 'geolocation' and 'navigator.mediaDevices.getUserMedia' for video.
