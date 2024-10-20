import { create } from "zustand";
import { Track, Tracks } from "./screens/search/types";

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
    set((state) => ({ playlistTracks: [...state.playlistTracks, track] })),
  removeTrack: (track: Track) => set({ playlistTracks: [] }),
  rename: (name: string) => set({ playlistName: name }),
}));
