import { Status } from "../../../screens/search/types";

export type TrackProps = {
  album: string;
  artist: string;
  artwork: string;
  title: string;
  year: number;
  status: Status;
};
