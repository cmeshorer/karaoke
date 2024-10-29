import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";
import { NavigationButtonProps } from "./types";
import { getStyle } from "../../../tools/style";

const NavigationButton = ({ navigateTo }: NavigationButtonProps) => {
  return (
    <Link className="NavigationButton" to={navigateTo}>
      <BsArrowLeft size={getStyle("--layout-dimension-icon-large")} />
    </Link>
  );
};

export default NavigationButton;
