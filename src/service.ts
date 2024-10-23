import axios from "axios";
import { Buffer } from "buffer";
import {
  Album,
  Artist,
  CountryCodes,
  ExternalIds,
  ExternalUrls,
  Restrictions,
  Status,
  Track,
  Tracks,
} from "./model";
import { joinItems } from "./tools/string";
import { formatDuration, formatReleaseDate } from "./tools/time";

export interface BackendTokenData {
  access_token: string; // An access token that can be provided in subsequent calls, for example to Spotify Web API services.
  token_type: string; // How the access token may be used: always "Bearer".
  expires_in: number; // The time period (in seconds) for which the access token is valid.
}

export interface BackendTrack {
  album: Album; // The album on which the track appears. The album object includes a link in href to full information about the album.
  artists: Artist[]; // The artists who performed the track. Each artist object includes a link in href to more detailed information about the artist.
  available_markets: CountryCodes[]; // A list of the countries in which the track can be played, identified by their ISO 3166-1 alpha-2 code.
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
    year: formatReleaseDate(backendTrack.album.release_date),
  }));
  return adaptedTracks as Tracks;
};

export const service = {
  auth: {
    getAccessToken: async () => {
      const clientId = "";
      const clientSecret = "";
      const api = "https://accounts.spotify.com/api/token";
      const body = { grant_type: "client_credentials" };
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          clientId + ":" + clientSecret
        ).toString("base64")}`,
      };
      const response = await axios.post(api, body, { headers });
      const backendTokenData = response.data as BackendTokenData;
      const accessToken = backendTokenData.access_token;
      localStorage.setItem("accessToken", accessToken);
    },
  },
  tracks: {
    search: async (query: string) => {
      const api = `https://api.spotify.com/v1/search?type=track&limit=22&q=${encodeURIComponent(
        query
      )}`;
      const accessToken = localStorage.getItem("accessToken");
      const headers = { Authorization: `Bearer ${accessToken}` };
      const response = await axios.get(api, { headers });
      const backendTracksData = response.data as BackendTracksData;
      const tracks = tracksAdaptor(backendTracksData);
      return tracks;
    },
  },
  playlist: {
    addTracks: async (tracks: Tracks) => {},
    create: async (name: string) => {},
    removeTrack: async (track: Track) => {},
    rename: async (name: string) => {},
  },
};
