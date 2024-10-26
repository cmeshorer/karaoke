import { Route, Routes } from "react-router-dom";
import AuthScreen from "./screens/auth";
import SearchScreen from "./screens/search";
import SongListScreen from "./screens/song-list";
import "./variables.css";
import { useAuthStore } from "./store";

function App() {
  const storedAccessToken = localStorage.getItem("accessToken");
  const setHasAccessToken = useAuthStore((state) => state.setHasAccessToken);
  if (storedAccessToken) setHasAccessToken();
  const hasAccessToken = useAuthStore((state) => state.hasAccessToken);

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
