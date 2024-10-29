import { MdExplicit } from "react-icons/md";
import { FaChartSimple } from "react-icons/fa6";
import { TrackProps } from "./types";
import TrackStatus from "../status";
import { Status } from "../../../model";
import { useMusicStore } from "../../../store";
import { getStyle } from "../../../tools/style";

const Track = ({ isHighlighted, track }: TrackProps) => {
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
  const addTrack = useMusicStore().addTrack;
  const removeTrack = useMusicStore().removeTrack;

  return (
    <div className={`Track ${isHighlighted ? "Track--highlighted" : ""}`}>
      <img className="Track-artwork" src={artwork} alt="Artwork" />
      <div className="Track-metadata">
        <p className="Track-name">{name}</p>
        <p>{duration}</p>
        <p>{album}</p>
        <p>{artists}</p>
        <p>{year}</p>
        <div className="Track-content">
          {explicit ? (
            <MdExplicit size={getStyle("--layout-dimension-icon-small")} />
          ) : null}
          {popularity > 70 ? (
            <div className="Track-popularity">
              <FaChartSimple size={getStyle("--layout-dimension-icon-small")} />
            </div>
          ) : null}
        </div>
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
