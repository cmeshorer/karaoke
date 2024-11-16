import { AxiosError } from "axios";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";

import TextField from "../../components/text-field";
import Page from "../../components/page";
import { SearchScreenProps } from "./types";
import ActionButton from "../../components/buttons/action";
import { service } from "../../service";
import { useMusicStore } from "../../store";
import { isTokenExpired, isUnauthorizedError } from "../../tools/auth";
import { maxMobileWidth } from "../../tools/style";

const SearchScreen = (props: SearchScreenProps) => {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState("");
  const isQueryEmpty = query === "";
  const isMobile = useMediaQuery({ maxWidth: maxMobileWidth });
  const populateResults = useMusicStore().populateResults;
  const navigate = useNavigate();

  const onSearchTracks = async () => {
    try {
      setSearchError("");
      setIsSearching(true);
      if (isTokenExpired()) await service.auth.refreshToken();
      const foundTracks = await service.tracks.search(query, isMobile);
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

  const onClearQuery = () => {
    setQuery("");
  };

  return (
    <Page>
      <TextField
        placeholder="Artists, Albums, Songs, ..."
        onChangeText={onSetQuery}
        onClearText={onClearQuery}
        onSubmit={isQueryEmpty ? undefined : onSearchTracks}
        value={query}
        isDisabled={isSearching}
        className="search"
      />
      <ActionButton
        title="SEARCH"
        onClick={onSearchTracks}
        isDisabled={isQueryEmpty}
        isLoading={isSearching}
        error={searchError}
      />
    </Page>
  );
};

export default SearchScreen;
