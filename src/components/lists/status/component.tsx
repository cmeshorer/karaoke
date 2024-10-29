import { Status } from "../../../model";
import { getStyle } from "../../../tools/style";
import { TrackStatusProps } from "./types";
import { AiOutlineCheck, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const TrackStatus = ({ isDisabled, onClick, status }: TrackStatusProps) => {
  return (
    <button
      className={`TrackStatus TrackStatus--${status}`}
      disabled={isDisabled}
      onClick={onClick}
    >
      {status === Status.ADDED ? (
        <AiOutlineCheck size={getStyle("--layout-dimension-icon-medium")} />
      ) : status === Status.ADD ? (
        <AiOutlinePlus size={getStyle("--layout-dimension-icon-medium")} />
      ) : status === Status.REMOVE ? (
        <AiOutlineMinus size={getStyle("--layout-dimension-icon-medium")} />
      ) : null}
    </button>
  );
};

export default TrackStatus;
