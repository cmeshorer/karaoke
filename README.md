# ℹ️ Introduction

This is an app that reimagines Spotify playlist creation. It was built using React and the Spotify Web API. It is intended to evolve into a real Karaoke (カラオケ) 🎤 machine that would allow users to view lyrics to their favorite songs, in a colorful environment synched to the playlist "mood". The app will also enable 3D visualization of relevant API data, to get a deeper understanding of the music.

# ✅ Features

- Allow access to Spotify using the Authorization Code Flow
- Search through Spotify's catalog to find the perfect tracks
- Add songs to a new playlist
- Name, edit and export playlist to Spotify account
- View app in Dark Mode
- Responsive Design

# ⭐️ Future work

- Reorder playlist tracks
- Display lyrics
- Playback songs
- Party Mode
- Synched animations
- Data visualization

# 🚀 Technologies
- Spotify Web API
- Axios
- Dotenv
- Lottie React
- React Icons
- React Responsive
- React Router
- Zustand

# 💾 Guide

### Required stack

- [Node](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [Npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) or [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)

### Adding environment variables

- Create a [Spotify account](https://www.spotify.com/us/signup)
- Login to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard) and [create an app](https://developer.spotify.com/documentation/web-api/tutorials/getting-started#create-an-app)
- Click on the new app and the _Settings_ button
- Paste the _Redirect URI_, _Client ID_ and _Client Secret_ into a new _.env_ file

```
REACT_APP_REDIRECT_URI = http://localhost:3000
REACT_APP_CLIENT_ID = 1a2b3c
REACT_APP_CLIENT_SECRET = 4x5y6z
```

- Place the _.env_ file at the root of the project

### Running the Project

- Install packages using `npm install` or `yarn install`
- Start project using `npm start` or `yarn start`
