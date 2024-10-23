import Track from "../track";
import { ResultsListProps } from "./types";

const ResultsList = ({ tracks }: ResultsListProps) => {
  return (
    <div className="Results-list">
      {tracks.map((track) => (
        <Track key={track.id} track={track} />
      ))}
    </div>
  );
};

export default ResultsList;
