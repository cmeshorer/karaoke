export interface SearchScreenProps {}

export enum Status {
  ADD = "add",
  ADDED = "added",
  REMOVE = "remove",
}

export type Track = {
  id: number;
  title: string;
  album: string;
  artist: string;
  artwork: string;
  year: number;
  status: Status;
};

export type Tracks = Track[];
