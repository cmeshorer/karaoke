import { PageProps } from "./types";

const Page = ({ children }: PageProps) => {
  return (
    <div className="Page">
      <header>
        <h1>Karaoke (カラオケ) 🎤</h1>
        <h2>enjoy some music</h2>
      </header>
      {children}
    </div>
  );
};

export default Page;
