import Track from "../track";
import { ResultsListProps } from "./types";

const ResultsList = ({ tracks }: ResultsListProps) => {
  return (
    <div className="Results-list">
      {tracks.map((track) => (
        <Track
          key={track.id}
          album={track.album}
          artist={track.artist}
          title={track.title}
          artwork={track.artwork}
          year={track.year}
          status={track.status}
        />
      ))}
    </div>
  );
};

export default ResultsList;
