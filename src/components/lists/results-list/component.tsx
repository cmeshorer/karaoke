import { isEvenNumber } from "../../../tools/math";
import Track from "../track";
import { ResultsListProps } from "./types";

const ResultsList = ({ tracks }: ResultsListProps) => {
  return (
    <div>
      {tracks.map((track, index) => (
        <Track
          key={track.id}
          track={track}
          isHighlighted={isEvenNumber(index)}
        />
      ))}
    </div>
  );
};

export default ResultsList;
