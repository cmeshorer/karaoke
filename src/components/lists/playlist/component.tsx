import { useState } from "react";
import { useKaraokeStore } from "../../../store";
import ActionButton from "../../buttons/action";
import Input from "../../input";
import Track from "../track";
import { PlaylistProps } from "./types";
import { service } from "../../../service";

const Playlist = ({ name, tracks }: PlaylistProps) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isError, setIsError] = useState(false);
  const playlistName = useKaraokeStore().playlistName;
  const renamePlaylist = useKaraokeStore().renamePlaylist;
  const clearPlaylist = useKaraokeStore().clearPlaylist;
  const isPlaylistIncomplete = tracks.length === 0 || playlistName === "";

  const onRenamePlaylist = (name: string) => {
    setIsError(false);
    renamePlaylist(name);
  };

  const savePlaylist = async () => {
    try {
      setIsError(false);
      setIsSaving(true);
      const trackUris = tracks.map((track) => track.uri);
      const playlistId = await service.playlist.create(playlistName);
      await service.playlist.addTracks(playlistId, trackUris);
      clearPlaylist();
    } catch (error) {
      setIsError(true);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="Playlist">
      <Input
        placeholder="Playlist Name"
        onChangeText={onRenamePlaylist}
        value={name}
        style={{
          borderRadius: 0,
          borderWidth: 0,
          borderBottomWidth: 1,
          backgroundColor: "#f7f0ed",
        }}
      />
      {tracks.map((track) => (
        <Track key={track.id} track={track} />
      ))}
      <ActionButton
        title="SAVE TO SPOTIFY"
        onClick={savePlaylist}
        isDisabled={isPlaylistIncomplete}
        isLoading={isSaving}
        isError={isError}
      />
    </div>
  );
};

export default Playlist;
