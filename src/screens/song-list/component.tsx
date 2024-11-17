import { AxiosError } from "axios";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useLocation } from "react-router-dom";
import NavigationButton from "../../components/buttons/navigation";
import Toggle from "../../components/buttons/toggle";
import Page from "../../components/page";
import { List, SongListScreenProps } from "./types";
import Playlist from "../../components/lists/playlist";
import ResultsList from "../../components/lists/results-list";
import { useMusicStore } from "../../store";
import { isTokenExpired, isUnauthorizedError } from "../../tools/auth";
import { service } from "../../service";
import Loader from "../../components/loader";
import FeedbackText from "../../components/feedback-text";
import { Type } from "../../components/feedback-text/types";

const SongListScreen = (props: SongListScreenProps) => {
  const [list, setList] = useState(List.RESULTS);
  const [page, setPage] = useState(2);
  const [fetchError, setFetchError] = useState("");
  const [hasMoreTracks, setHasMoreTracks] = useState(true);
  const { query, isMobile } = useLocation().state;
  const populateResults = useMusicStore().populateResults;
  const foundTracks = useMusicStore().foundTracks;
  const playlistTracks = useMusicStore().playlistTracks;
  const playlistName = useMusicStore().playlistName;

  const onFetchNextPage = async () => {
    try {
      if (isTokenExpired()) await service.auth.refreshToken();
      const foundNextTracks = await service.tracks.search(
        query,
        isMobile,
        page
      );
      populateResults([...foundTracks, ...foundNextTracks]);
      setPage(page + 1);
    } catch (error) {
      if (isUnauthorizedError(error as AxiosError)) {
        await service.auth.refreshToken();
        onFetchNextPage();
      } else if ((error as AxiosError).response?.status === 400) {
        setHasMoreTracks(false);
      } else {
        console.error(error);
        setFetchError("An error has occured. Please try again.");
      }
    }
  };

  return (
    <Page>
      <div className="SongList-navigation">
        <NavigationButton navigateTo="/" />
      </div>
      <div>
        <Toggle
          title="TRACKS"
          onClick={() => setList(List.RESULTS)}
          isSelected={list === List.RESULTS}
        />
        <Toggle
          title="PLAYLIST"
          onClick={() => setList(List.PLAYLIST)}
          isSelected={list === List.PLAYLIST}
        />
      </div>
      <div className={`SongList-list SongList-list--${list}`}>
        {list === List.RESULTS ? (
          <InfiniteScroll
            next={onFetchNextPage}
            hasMore={hasMoreTracks}
            dataLength={foundTracks.length}
            scrollThreshold={1}
            loader={
              <div className="SongList-feedback">
                {fetchError === "" ? (
                  <Loader />
                ) : (
                  <FeedbackText type={Type.ERROR} message={fetchError} />
                )}
              </div>
            }
            endMessage={
              <div className="SongList-feedback">
                <FeedbackText
                  type={Type.SUCCESS}
                  message={`No more results to display for "${query}"'`}
                />
              </div>
            }
          >
            <ResultsList tracks={foundTracks} />
          </InfiniteScroll>
        ) : (
          <Playlist name={playlistName} tracks={playlistTracks} />
        )}
      </div>
    </Page>
  );
};

export default SongListScreen;
