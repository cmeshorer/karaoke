import { useCallback, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { PageProps } from "./types";
import { useAuthStore, useThemeStore } from "../../store";
import { prefersDarkColorScheme, setTheme } from "../../tools/theme";
import Switch from "../buttons/switch";
import Avatar from "../avatar";
import { service } from "../../service";

const Page = ({ children }: PageProps) => {
  const isDarkTheme = useThemeStore().isDarkTheme;
  const setIsDarkTheme = useThemeStore().setIsDarkTheme;
  const { setUser, user } = useAuthStore();

  const getUserProfile = useCallback(async () => {
    try {
      const userProfile = await service.user.profile();
      setUser(userProfile);
    } catch (error) {
      console.error(error);
    }
  }, [setUser]);

  useEffect(() => {
    setTheme(isDarkTheme);
    if (!user) getUserProfile();
  }, [getUserProfile, isDarkTheme, user]);

  useMediaQuery(prefersDarkColorScheme, undefined, (isSystemDarkTheme) =>
    setIsDarkTheme(isSystemDarkTheme)
  );

  return (
    <div className="Page">
      <div className="Page-user">
        <Switch
          checked={isDarkTheme}
          onCheck={() => setIsDarkTheme(!isDarkTheme)}
        />
        <Avatar />
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
