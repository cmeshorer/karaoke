import Loader from "../../loader";
import ErrorText from "../../texts/error";
import { ActionButtonProps } from "./types";

const ActionButton = ({ onClick, title, isDisabled }: ActionButtonProps) => {
  return (
    <div>
      {true ? (
        <button
          className="Action-button"
          disabled={isDisabled}
          onClick={onClick}
        >
          {title}
        </button>
      ) : (
        <Loader />
      )}
      {false ? (
        <ErrorText text="Une erreur est survenue. Veuillez essayer à nouveau." />
      ) : null}
    </div>
  );
};

export default ActionButton;
