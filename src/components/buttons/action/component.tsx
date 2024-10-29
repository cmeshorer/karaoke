import Loader from "../../loader";
import FeedbackText from "../../feedback-text";
import { Type } from "../../feedback-text/types";
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
          className="ActionButton-button"
          disabled={isDisabled}
          onClick={onClick}
        >
          {title}
        </button>
      )}
      {error ? <FeedbackText message={error} type={Type.ERROR} /> : null}
    </div>
  );
};

export default ActionButton;
