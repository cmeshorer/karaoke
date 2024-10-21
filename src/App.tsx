import { Route, Routes } from "react-router-dom";
import SearchScreen from "./screens/search";
import SongListScreen from "./screens/song-list";
import "./variables.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SearchScreen />} />
      <Route path="/songs" element={<SongListScreen />} />
    </Routes>
  );
}

export default App;
