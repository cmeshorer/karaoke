import { AxiosError } from "axios";
import { useState } from "react";
import { useMusicStore } from "../../../store";
import ActionButton from "../../buttons/action";
import Input from "../../input";
import Track from "../track";
import { PlaylistProps } from "./types";
import { service } from "../../../service";
import { isTokenExpired, isUnauthorizedError } from "../../../tools/auth";

const Playlist = ({ name, tracks }: PlaylistProps) => {
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const playlistName = useMusicStore().playlistName;
  const renamePlaylist = useMusicStore().renamePlaylist;
  const clearPlaylist = useMusicStore().clearPlaylist;
  const isPlaylistIncomplete = tracks.length === 0 || playlistName === "";

  const onRenamePlaylist = (name: string) => {
    setSaveError("");
    renamePlaylist(name);
  };

  const onSavePlaylist = async () => {
    try {
      setSaveError("");
      setIsSaving(true);
      if (isTokenExpired()) await service.auth.refreshToken();
      const trackUris = tracks.map((track) => track.uri);
      const userId = await service.user.profile();
      const playlistId = await service.playlist.create(userId, playlistName);
      await service.playlist.addTracks(userId, playlistId, trackUris);
      clearPlaylist();
    } catch (error) {
      if (isUnauthorizedError(error as AxiosError)) {
        await service.auth.refreshToken();
        onSavePlaylist();
      } else {
        console.error(error);
        setSaveError("Error saving playlist.");
      }
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
        onClick={onSavePlaylist}
        isDisabled={isPlaylistIncomplete}
        isLoading={isSaving}
        error={saveError}
      />
    </div>
  );
};

export default Playlist;
