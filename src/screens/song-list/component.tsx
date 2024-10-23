import { useState } from "react";
import NavigationButton from "../../components/buttons/navigation";
import ToggleButton from "../../components/buttons/toggle";
import Page from "../../components/page";
import { List, SongListScreenProps } from "./types";
import Playlist from "../../components/lists/playlist";
import ResultsList from "../../components/lists/results-list";
import { useKaraokeStore } from "../../store";

const SongListScreen = (props: SongListScreenProps) => {
  const [list, setList] = useState(List.RESULTS);
  const foundTracks = useKaraokeStore().foundTracks;

  return (
    <Page>
      <div style={{ alignSelf: "flex-start" }}>
        <NavigationButton title="Return" navigateTo="/" />
      </div>
      <div style={{ display: "flex", marginTop: 20 }}>
        <ToggleButton
          title="Results"
          onClick={() => setList(List.RESULTS)}
          isSelected={list === List.RESULTS}
        />
        <ToggleButton
          title="Playlist"
          onClick={() => setList(List.PLAYLIST)}
          isSelected={list === List.PLAYLIST}
        />
      </div>
      {list === List.RESULTS ? (
        <ResultsList tracks={foundTracks} />
      ) : (
        <Playlist name={""} tracks={[]} />
      )}
    </Page>
  );
};

export default SongListScreen;
