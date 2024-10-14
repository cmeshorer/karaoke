import { Status } from "../../../screens/search/types";
import { TrackStatusProps } from "./types";

const TrackStatus = ({ onClick, status }: TrackStatusProps) => {
  return (
    <button
      className="Song-status"
      onClick={onClick}
      style={{
        backgroundColor:
          status === Status.ADDED
            ? "green"
            : status === Status.ADD
            ? "yellow"
            : status === Status.REMOVE
            ? "red"
            : undefined,
      }}
    >
      {status === Status.ADDED
        ? "V"
        : status === Status.ADD
        ? "+"
        : status === Status.REMOVE
        ? "-"
        : ""}
    </button>
  );
};

export default TrackStatus;
