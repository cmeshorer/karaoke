import { TrackProps } from "./types";
import TrackStatus from "../status";
import { Status } from "../../../screens/search/types";

const Track = ({ album, artist, artwork, title, year, status }: TrackProps) => {
  return (
    <div className="Track">
      <img
        className="Artwork"
        src={artwork}
        alt="Artwork"
        height={180}
        width={180}
      />
      <div className="Metadata">
        <p className="Title">{title}</p>
        <p className="Info">{album}</p>
        <p className="Info">{artist}</p>
        <p className="Info">{year}</p>
      </div>
      <TrackStatus
        status={status}
        onClick={() =>
          console.log(
            status === Status.ADD
              ? "added"
              : status === Status.ADDED
              ? ""
              : status === Status.REMOVE
              ? "removed"
              : ""
          )
        }
      />
    </div>
  );
};

export default Track;
