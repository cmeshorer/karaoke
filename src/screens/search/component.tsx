import Lottie from "lottie-react";
import { useState } from "react";

import micAnimation from "../../assets/animations/mic.json";
import Input from "../../components/input";
import Page from "../../components/page";
import { SearchScreenProps } from "./types";
import ActionButton from "../../components/buttons/action";
import { service } from "../../service";
import { useNavigate } from "react-router-dom";
import { useKaraokeStore } from "../../store";

const SearchScreen = (props: SearchScreenProps) => {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isError, setIsError] = useState(false);
  const isQueryEmpty = query === "";
  const populateResults = useKaraokeStore().populateResults;
  const navigate = useNavigate();

  const searchTracks = async () => {
    try {
      setIsError(false);
      setIsSearching(true);
      if (localStorage.getItem("accessToken") === null) {
        await service.auth.getAccessToken();
      }
      const foundTracks = await service.tracks.search(query);
      populateResults(foundTracks);
      navigate("/songs");
    } catch (error) {
      setIsError(true);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <Page>
      <Input
        placeholder="Artists, Albums, Songs, ..."
        onChangeText={(query) => setQuery(query)}
        value={query}
        isDisabled={isSearching}
      />
      <div style={{ marginTop: 20 }}>
        <ActionButton
          title="SEARCH"
          onClick={searchTracks}
          isDisabled={isQueryEmpty}
          isLoading={isSearching}
          isError={isError}
        />
      </div>
      {/* <Lottie
        style={{ width: 400, height: 400 }}
        animationData={micAnimation}
      /> */}
    </Page>
  );
};

export default SearchScreen;
