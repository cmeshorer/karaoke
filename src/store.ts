import { create } from "zustand";
import { Status, Track, Tracks } from "./model";

type KaraokeState = {
  foundTracks: Tracks;
  playlistTracks: Tracks;
  playlistName: string;
  populateResults: (tracks: Tracks) => void;
  addTrack: (track: Track) => void;
  removeTrack: (track: Track) => void;
  rename: (name: string) => void;
};

export const useKaraokeStore = create<KaraokeState>((set) => ({
  foundTracks: [],
  playlistTracks: [],
  playlistName: "",
  populateResults: (tracks: Tracks) => set({ foundTracks: tracks }),
  addTrack: (track: Track) =>
    set((state) => {
      const updatedFoundTracks = state.foundTracks.map((foundTrack) =>
        foundTrack.id === track.id
          ? { ...track, status: Status.ADDED }
          : foundTrack
      );
      const updatedPlaylistTracks = [
        ...state.playlistTracks,
        { ...track, status: Status.REMOVE },
      ];
      return {
        foundTracks: updatedFoundTracks,
        playlistTracks: updatedPlaylistTracks,
      };
    }),
  removeTrack: (track: Track) => set({ playlistTracks: [] }),
  rename: (name: string) => set({ playlistName: name }),
}));
