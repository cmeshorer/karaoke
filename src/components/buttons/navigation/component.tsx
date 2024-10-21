import { Link } from "react-router-dom";
import { NavigationButtonProps } from "./types";

const NavigationButton = ({ navigateTo, title }: NavigationButtonProps) => {
  return (
    <Link className="Navigation-button" to={navigateTo}>
      {title}
    </Link>
  );
};

export default NavigationButton;
