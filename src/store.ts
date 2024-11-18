import { create } from "zustand";
import { Status, Track, Tracks, UserProfile } from "./model";

type ThemeState = {
  isDarkTheme: boolean;
  setIsDarkTheme: (isDarkTheme: boolean) => void;
};

type AuthState = {
  hasAccessToken: boolean;
  user: UserProfile | undefined;
  setHasAccessToken: () => void;
  setUser: (user: UserProfile) => void;
};

type MusicState = {
  foundTracks: Tracks;
  playlistTracks: Tracks;
  playlistName: string;
  populateResults: (tracks: Tracks) => void;
  addTrack: (track: Track) => void;
  removeTrack: (track: Track) => void;
  renamePlaylist: (name: string) => void;
  clearPlaylist: () => void;
};

export const useThemeStore = create<ThemeState>((set) => ({
  isDarkTheme: false,
  setIsDarkTheme: (isDarkTheme) => set({ isDarkTheme }),
}));

export const useAuthStore = create<AuthState>((set) => ({
  hasAccessToken: false,
  user: undefined,
  setHasAccessToken: () => set({ hasAccessToken: true }),
  setUser: (user: UserProfile) => set({ user }),
}));

export const useMusicStore = create<MusicState>((set) => ({
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
  removeTrack: (track: Track) =>
    set((state) => {
      const updatedFoundTracks = state.foundTracks.map((foundTrack) =>
        foundTrack.id === track.id
          ? { ...track, status: Status.ADD }
          : foundTrack
      );
      const updatedPlaylistTracks = state.playlistTracks.filter(
        (playlistTrack) => playlistTrack.id !== track.id
      );
      return {
        foundTracks: updatedFoundTracks,
        playlistTracks: updatedPlaylistTracks,
      };
    }),
  renamePlaylist: (name: string) => set({ playlistName: name }),
  clearPlaylist: () =>
    set((state) => {
      const updatedFoundTracks = state.foundTracks.map((foundTrack) => ({
        ...foundTrack,
        status: Status.ADD,
      }));
      return {
        foundTracks: updatedFoundTracks,
        playlistTracks: [],
        playlistName: "",
      };
    }),
}));
