import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { PageProps } from "./types";
import { useThemeStore } from "../../store";
import { prefersDarkColorScheme, setTheme } from "../../tools/theme";
import Switch from "../buttons/switch";

const Page = ({ children }: PageProps) => {
  const isDarkTheme = useThemeStore().isDarkTheme;
  const setIsDarkTheme = useThemeStore().setIsDarkTheme;

  useEffect(() => {
    setTheme(isDarkTheme);
  }, [isDarkTheme]);

  useMediaQuery(prefersDarkColorScheme, undefined, (isSystemDarkTheme) =>
    setIsDarkTheme(isSystemDarkTheme)
  );

  return (
    <div className="Page">
      <div className="Page-switch">
        <Switch
          checked={isDarkTheme}
          onCheck={() => setIsDarkTheme(!isDarkTheme)}
        />
      </div>
      <header>
        <h1>Karaoke (カラオケ) 🎤</h1>
        <h2>enjoy some music</h2>
      </header>
      {children}
    </div>
  );
};

export default Page;
