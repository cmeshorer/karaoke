import { useState } from "react";
import NavigationButton from "../../components/buttons/navigation";
import ToggleButton from "../../components/buttons/toggle";
import Page from "../../components/page";
import { List, SongListScreenProps } from "./types";
import Playlist from "../../components/lists/playlist";
import ResultsList from "../../components/lists/results-list";
import { useMusicStore } from "../../store";

const SongListScreen = (props: SongListScreenProps) => {
  const [list, setList] = useState(List.RESULTS);
  const foundTracks = useMusicStore().foundTracks;
  const playlistTracks = useMusicStore().playlistTracks;
  const playlistName = useMusicStore().playlistName;

  return (
    <Page>
      <NavigationButton navigateTo="/" />
      <div>
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
      <div className={`SongList-list SongList-list--${list}`}>
        {list === List.RESULTS ? (
          <ResultsList tracks={foundTracks} />
        ) : (
          <Playlist name={playlistName} tracks={playlistTracks} />
        )}
      </div>
    </Page>
  );
};

export default SongListScreen;
