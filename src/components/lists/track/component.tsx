import { TrackProps } from "./types";
import TrackStatus from "../status";
import { Status } from "../../../model";
import { useKaraokeStore } from "../../../store";

const Track = ({ track }: TrackProps) => {
  const {
    album,
    artists,
    artwork,
    duration,
    explicit,
    name,
    popularity,
    status,
    year,
  } = track;
  const addTrack = useKaraokeStore().addTrack;
  const removeTrack = useKaraokeStore().removeTrack;

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
        isDisabled={status === Status.ADDED}
        onClick={() => {
          if (status === Status.ADD) addTrack(track);
          else removeTrack(track);
        }}
      />
    </div>
  );
};

export default Track;
