import { TrackProps } from "./types";
import TrackStatus from "../status";
import { Status } from "../../../model";

const Track = ({
  track: {
    album,
    artists,
    artwork,
    duration,
    explicit,
    name,
    popularity,
    status,
    year,
  },
}: TrackProps) => {
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
        <p className="Name">{name}</p>
        <p className="Info">{duration}</p>
        <p className="Info">{album}</p>
        <p className="Info">{artists}</p>
        <p className="Info">{year}</p>
        <p className="Info">{explicit ? "(E)" : ""}</p>
        <p className="Info">{popularity}</p>
      </div>
      <TrackStatus
        status={status}
        onClick={() =>
          console.log(
            status === Status.ADD
              ? "added"
              : status === Status.ADDED
              ? "already added"
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
