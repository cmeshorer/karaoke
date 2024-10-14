import { SubtitleProps } from "./types";

const Subtitle = ({ text }: SubtitleProps) => {
  return <h2 className="Subtitle">{text}</h2>;
};

export default Subtitle;
