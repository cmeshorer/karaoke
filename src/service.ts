import axios from "axios";
import { Buffer } from "buffer";
import {
  Album,
  Artist,
  CountryCode,
  ExplicitContent,
  ExternalIds,
  ExternalUrls,
  Followers,
  Image,
  Owner,
  Restrictions,
  Status,
  Tracks,
  TrackUris,
} from "./model";
import { generateRandomString, joinItems } from "./tools/string";
import { formatDuration, formatReleaseDate } from "./tools/time";
import { storeTokenData } from "./tools/auth";

export interface BackendAccessTokenData {
  access_token: string; // An access token that can be provided in subsequent calls, for example to Spotify Web API services.
  expires_in: number; // The time period (in seconds) for which the access token is valid.
  refresh_token: string; // Obtain new access tokens without reauthorizing the application.
  scope: string; // A space-separated list of scopes which have been granted for this access_token.
  token_type: "Bearer"; // How the access token may be used: always "Bearer".
}

export interface BackendRefreshTokenData
  extends Omit<BackendAccessTokenData, "refresh_token"> {
  refresh_token?: string; // Obtain new access tokens without reauthorizing the application.
}

export interface BackendTrack {
  album: Album; // The album on which the track appears. The album object includes a link in href to full information about the album.
  artists: Artist[]; // The artists who performed the track. Each artist object includes a link in href to more detailed information about the artist.
  available_markets: CountryCode[]; // A list of the countries in which the track can be played, identified by their ISO 3166-1 alpha-2 code.
  disc_number: number; // The disc number (usually 1 unless the album consists of more than one disc).
  duration_ms: number; // The track length in milliseconds.
  explicit: boolean; // Whether or not the track has explicit lyrics ( true = yes it does; false = no it does not OR unknown).
  external_ids: ExternalIds; // Known external IDs for the track.
  external_urls: ExternalUrls; // Known external URLs for this track.
  href: string; // A link to the Web API endpoint providing full details of the track.
  id: string; // The Spotify ID for the track.
  is_local: boolean; // Whether or not the track is from a local file.
  is_playable: boolean; // Part of the response when Track Relinking is applied. If true, the track is playable in the given market. Otherwise false.
  linked_from: object; // Part of the response when Track Relinking is applied, and the requested track has been replaced with different track. The track in the linked_from object contains information about the originally requested track.
  restrictions: Restrictions; // Included in the response when a content restriction is applied.
  name: string; // The name of the track.
  popularity: number; // The popularity of the track. The value will be between 0 and 100, with 100 being the most popular.
  // The popularity of a track is a value between 0 and 100, with 100 being the most popular. The popularity is calculated by algorithm and is based, in the most part, on the total number of plays the track has had and how recent those plays are.
  // Generally speaking, songs that are being played a lot now will have a higher popularity than songs that were played a lot in the past. Duplicate tracks (e.g. the same track from a single and an album) are rated independently. Artist and album popularity is derived mathematically from track popularity.
  // Note: the popularity value may lag actual popularity by a few days: the value is not updated in real time.
  preview_url: string | null; // A link to a 30 second preview (MP3 format) of the track (can be null).
  track_number: number; // The number of the track. If an album has several discs, the track number is the number on the specified disc.
  type: "track"; // The object type: "track".
  uri: string; // The Spotify URI for the track.
}

export interface BackendTracksData {
  tracks: {
    href: string; // A link to the Web API endpoint returning the full result of the request.
    limit: number; // The maximum number of items in the response (as set in the query or by default).
    next: string | null; // URL to the next page of items (null if none).
    offset: number; // The offset of the items returned (as set in the query or by default).
    previous: string | null; // URL to the previous page of items (null if none).
    total: number; // The total number of items available to return.
    items: BackendTrack[]; // Array of tracks.
  };
}

export interface BackendPlaylistData {
  collaborative: boolean; // true if the owner allows other users to modify the playlist.
  description: string | null; // The playlist description. Only returned for modified, verified playlists, otherwise null.
  external_urls: ExternalUrls; // Known external URLs for this playlist.
  followers: Followers; // Information about the followers of the playlist.
  href: string; // A link to the Web API endpoint providing full details of the playlist.
  id: string; // The Spotify ID for the playlist.
  images: Image[]; // Images for the playlist. The array may be empty or contain up to three images. The images are returned by size in descending order. Note: If returned, the source URL for the image (url) is temporary and will expire in less than a day.
  name: string; // The name of the playlist.
  owner: Owner; // The user who owns the playlist.
  public: boolean | null; // The playlist's public/private status (if it is added to the user's profile): true the playlist is public, false the playlist is private, null the playlist status is not relevant.
  snapshot_id: string; // The version identifier for the current playlist. Can be supplied in other requests to target a specific playlist version.
  tracks: BackendTracksData; // The tracks of the playlist.
  type: "playlist"; // The object type: "playlist".
  uri: string; // The Spotify URI for the playlist.
}

export interface BackendUpdatedPlaylistData {
  snapshot_id: string; // A snapshot ID for the playlist.
}

export interface BackendUserProfileData {
  country?: CountryCode; // The country of the user, as set in the user's account profile. An ISO 3166-1 alpha-2 country code. This field is only available when the current user has granted access to the user-read-private scope.
  display_name: string; // The name displayed on the user's profile. null if not available.
  email: string; // The user's email address, as entered by the user when creating their account. Important! This email address is unverified; there is no proof that it actually belongs to the user. This field is only available when the current user has granted access to the user-read-email scope.
  explicit_content?: ExplicitContent; // The user's explicit content settings. This field is only available when the current user has granted access to the user-read-private scope.
  external_urls: ExternalUrls; // Known external URLs for this user.
  followers: Followers; // Information about the followers of the user.
  href: string; // A link to the Web API endpoint for this user.
  id: string; // The Spotify user ID for the user.
  images: Image[]; // The user's profile image.
  product?: string; // The user's Spotify subscription level: "premium", "free", etc. (The subscription level "open" can be considered the same as "free".) This field is only available when the current user has granted access to the user-read-private scope.
  type: "user"; // The object type: "user"
  uri: string; // The Spotify URI for the user.
}

export const tracksAdaptor = (backendTracksData: BackendTracksData) => {
  const adaptedTracks = backendTracksData.tracks.items.map((backendTrack) => ({
    album: backendTrack.album.name,
    artists: joinItems(backendTrack.artists.map((artist) => artist.name)),
    artwork: backendTrack.album.images[0].url,
    duration: formatDuration(backendTrack.duration_ms),
    explicit: backendTrack.explicit,
    id: backendTrack.id,
    name: backendTrack.name,
    popularity: backendTrack.popularity,
    status: Status.ADD,
    uri: backendTrack.uri,
    year: formatReleaseDate(backendTrack.album.release_date),
  }));
  return adaptedTracks as Tracks;
};

const redirectUri = process.env.REACT_APP_REDIRECT_URI;
const clientId = process.env.REACT_APP_CLIENT_ID;
const clientSecret = process.env.REACT_APP_CLIENT_SECRET;

export const service = {
  auth: {
    getCode: async () => {
      const state = generateRandomString(16);
      const scope = encodeURIComponent("playlist-modify-private");
      const api = `https://accounts.spotify.com/authorize?response_type=code&redirect_uri=${redirectUri}&client_id=${clientId}&state=${state}&scope=${scope}`;
      window.location.assign(api);
      localStorage.setItem("state", state);
    },
    getAccessToken: async (authorizationCode: string) => {
      const api = "https://accounts.spotify.com/api/token";
      const body = {
        grant_type: "authorization_code",
        code: authorizationCode,
        redirect_uri: redirectUri,
      };
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          `${clientId}:${clientSecret}`
        ).toString("base64")}`,
      };
      const response = await axios.post(api, body, { headers });
      const { access_token, expires_in, refresh_token } =
        response.data as BackendAccessTokenData;
      storeTokenData(access_token, expires_in, refresh_token);
      localStorage.removeItem("state");
    },
    refreshToken: async () => {
      const refreshToken = localStorage.getItem("refreshToken");
      const api = "https://accounts.spotify.com/api/token";
      const body = { grant_type: "refresh_token", refresh_token: refreshToken };
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          `${clientId}:${clientSecret}`
        ).toString("base64")}`,
      };
      const response = await axios.post(api, body, { headers });
      const { access_token, expires_in, refresh_token } =
        response.data as BackendRefreshTokenData;
      storeTokenData(access_token, expires_in, refresh_token);
    },
  },
  tracks: {
    search: async (query: string) => {
      const encodedQuery = encodeURIComponent(query);
      const api = `https://api.spotify.com/v1/search?type=track&limit=22&q=${encodedQuery}`;
      const accessToken = localStorage.getItem("accessToken");
      const headers = { Authorization: `Bearer ${accessToken}` };
      const response = await axios.get(api, { headers });
      const backendTracksData = response.data as BackendTracksData;
      const tracks = tracksAdaptor(backendTracksData);
      return tracks;
    },
  },
  playlist: {
    create: async (
      userId: BackendUserProfileData["id"],
      playlistName: string
    ) => {
      const accessToken = localStorage.getItem("accessToken");
      const api = `https://api.spotify.com/v1/users/${userId}/playlists`;
      const body = { name: playlistName, public: false };
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await axios.post(api, body, { headers });
      const backendPlaylistData = response.data as BackendPlaylistData;
      const playlistId = backendPlaylistData.id;
      return playlistId;
    },
    addTracks: async (
      userId: BackendUserProfileData["id"],
      playlistId: BackendPlaylistData["id"],
      trackUris: TrackUris
    ) => {
      const accessToken = localStorage.getItem("accessToken");
      const api = `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`;
      const body = { uris: trackUris };
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await axios.post(api, body, { headers });
      const backendUpdatedPlaylistData =
        response.data as BackendUpdatedPlaylistData;
      const playlistSnapshotId = backendUpdatedPlaylistData.snapshot_id;
      return playlistSnapshotId;
    },
  },
  user: {
    profile: async () => {
      const accessToken = localStorage.getItem("accessToken");
      const api = "https://api.spotify.com/v1/me";
      const headers = { Authorization: `Bearer ${accessToken}` };
      const response = await axios.get(api, { headers });
      const backendUserProfileData = response.data as BackendUserProfileData;
      const userId = backendUserProfileData.id;
      return userId;
    },
  },
};
