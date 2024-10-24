import { Status } from "../../../model";

export type TrackStatusProps = {
  isDisabled: boolean;
  onClick: () => void;
  status: Status;
};
