import SearchScreen from "./screens/search";
import SongListScreen from "./screens/song-list";
import "./variables.css";

function App() {
  return true ? <SearchScreen /> : <SongListScreen />;
}

export default App;
