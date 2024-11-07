# ℹ️ Introduction

This is an app for creating & exporting Spotify playlists. It was built using React and the Spotify Web API. It is intended to evolve into a real Karaoke (カラオケ) 🎤 machine that would allow users to view lyrics and sing along to their favorite tunes.

# ✅ Features

- Allow access to Spotify using the Authorization Code Flow
- Search through Spotify's catalog to find the perfect tracks
- Add songs to a new playlist
- Name, edit and export playlist to Spotify account
- View app in Dark Mode

# ⭐️ Future work

- Reorder playlist tracks
- Display lyrics
- Synched animations
- etc.

# 💾 Technical

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
