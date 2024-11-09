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
    <div className="ActionButton">
      <div className="ActionButton-button-container">
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
      </div>
      {error ? <FeedbackText message={error} type={Type.ERROR} /> : null}
    </div>
  );
};

export default ActionButton;
