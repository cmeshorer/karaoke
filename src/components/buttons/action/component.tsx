import Loader from "../../loader";
import ErrorText from "../../texts/error";
import { ActionButtonProps } from "./types";

const ActionButton = ({
  onClick,
  title,
  isDisabled,
  isError,
  isLoading,
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
      {isError ? (
        <ErrorText text="Une erreur est survenue. Veuillez essayer à nouveau." />
      ) : null}
    </div>
  );
};

export default ActionButton;
