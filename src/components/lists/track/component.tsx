import { MdExplicit } from "react-icons/md";
import { FaChartSimple } from "react-icons/fa6";
import { useMediaQuery } from "react-responsive";
import { TrackProps } from "./types";
import TrackStatus from "../status";
import { Status } from "../../../model";
import { useMusicStore } from "../../../store";
import {
  getStyle,
  maxMobileWidth,
  minDesktopWidth,
} from "../../../tools/style";

const Track = ({ isHighlighted, track }: TrackProps) => {
  const {
    album,
    artists,
    artworks,
    duration,
    explicit,
    name,
    popularity,
    status,
    year,
  } = track;
  const addTrack = useMusicStore().addTrack;
  const removeTrack = useMusicStore().removeTrack;
  const isMobile = useMediaQuery({ maxWidth: maxMobileWidth });
  const isDesktop = useMediaQuery({ minWidth: minDesktopWidth });

  return (
    <div className={`Track ${isHighlighted ? "Track--highlighted" : ""}`}>
      <picture className="Track-artwork-container">
        <source media="(max-width: 768px)" srcSet={artworks[1]} />
        <img className="Track-artwork" src={artworks[0]} alt="Artwork" />
      </picture>
      <div className="Track-metadata">
        <p className="Track-name">{name}</p>
        {isMobile ? (
          <>
            <p>{artists}</p>
            <p>{album}</p>
          </>
        ) : null}
        {isDesktop ? (
          <>
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
                  <FaChartSimple
                    size={getStyle("--layout-dimension-icon-small")}
                  />
                </div>
              ) : null}
            </div>
          </>
        ) : null}
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
