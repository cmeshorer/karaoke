import Loader from "../../loader";
import ErrorText from "../../texts/error";
import { ActionButtonProps } from "./types";

const ActionButton = ({
  error,
  isDisabled,
  isLoading,
  onClick,
  title,
}: ActionButtonProps) => {
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <button
          className="Action-button"
          disabled={isDisabled}
          onClick={onClick}
        >
          {title}
        </button>
      )}
      {error ? <ErrorText text={error} /> : null}
    </div>
  );
};

export default ActionButton;
