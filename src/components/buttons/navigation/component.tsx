// import { Link } from "react-router-dom";
import { NavigationButtonProps } from "./types";

const NavigationButton = ({ navigateTo, title }: NavigationButtonProps) => {
  return <button className="Navigation-button">{title}</button>;
  // <Link to={navigateTo}>
  // </Link>
};

export default NavigationButton;
