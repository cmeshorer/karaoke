import { AxiosError } from "axios";
import Lottie from "lottie-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import micAnimation from "../../assets/animations/mic.json";
import Input from "../../components/input";
import Page from "../../components/page";
import { SearchScreenProps } from "./types";
import ActionButton from "../../components/buttons/action";
import { service } from "../../service";
import { useMusicStore } from "../../store";
import { isTokenExpired, isUnauthorizedError } from "../../tools/auth";

const SearchScreen = (props: SearchScreenProps) => {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState("");
  const populateResults = useMusicStore().populateResults;
  const navigate = useNavigate();
  const isQueryEmpty = query === "";

  const onSearchTracks = async () => {
    try {
      setSearchError("");
      setIsSearching(true);
      if (isTokenExpired()) await service.auth.refreshToken();
      const foundTracks = await service.tracks.search(query);
      populateResults(foundTracks);
      navigate("/songs");
    } catch (error) {
      if (isUnauthorizedError(error as AxiosError)) {
        await service.auth.refreshToken();
        onSearchTracks();
      } else {
        console.error(error);
        setSearchError("Error getting tracks.");
      }
    } finally {
      setIsSearching(false);
    }
  };

  const onSetQuery = (query: string) => {
    setSearchError("");
    setQuery(query);
  };

  return (
    <Page>
      <Input
        placeholder="Artists, Albums, Songs, ..."
        onChangeText={onSetQuery}
        value={query}
        isDisabled={isSearching}
      />
      <div style={{ marginTop: 20 }}>
        <ActionButton
          title="SEARCH"
          onClick={onSearchTracks}
          isDisabled={isQueryEmpty}
          isLoading={isSearching}
          error={searchError}
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
