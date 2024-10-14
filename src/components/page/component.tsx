import Title from "../texts/title";
import { PageProps } from "./types";

const Page = ({ children }: PageProps) => {
  return (
    <div className="Page">
      <header className="Header">
        <Title text="Karaoke (カラオケ) 🎤" />
      </header>
      {children}
    </div>
  );
};

export default Page;
