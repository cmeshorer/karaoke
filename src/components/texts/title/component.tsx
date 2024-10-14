import { TitleProps } from "./types";

const Title = ({ text }: TitleProps) => {
  return <h1 className="Title">{text}</h1>;
};

export default Title;
