import { useMediaQuery } from "react-responsive";
import { Route, Routes } from "react-router-dom";
import AuthScreen from "./screens/auth";
import SearchScreen from "./screens/search";
import SongListScreen from "./screens/song-list";
import { useAuthStore, useThemeStore } from "./store";
import { prefersDarkColorScheme, setTheme, Theme } from "./tools/theme";

function App() {
  const storedAccessToken = localStorage.getItem("accessToken");
  const setHasAccessToken = useAuthStore((state) => state.setHasAccessToken);
  const hasAccessToken = useAuthStore((state) => state.hasAccessToken);
  if (storedAccessToken) setHasAccessToken();

  const storedTheme = localStorage.getItem("theme");
  const isSystemDarkTheme = useMediaQuery(prefersDarkColorScheme);
  const defaultIsDarkTheme = storedTheme
    ? storedTheme === Theme.DARK
    : isSystemDarkTheme;
  const setIsDarkTheme = useThemeStore((state) => state.setIsDarkTheme);
  setIsDarkTheme(defaultIsDarkTheme);
  setTheme(defaultIsDarkTheme);

  return (
    <Routes>
      {hasAccessToken ? (
        <Route>
          <Route path="/" element={<SearchScreen />} />
          <Route path="/songs" element={<SongListScreen />} />
        </Route>
      ) : (
        <Route path="/" element={<AuthScreen />} />
      )}
    </Routes>
  );
}

export default App;
