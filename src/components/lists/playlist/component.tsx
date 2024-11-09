import { AxiosError } from "axios";
import Lottie from "lottie-react";
import { useState } from "react";
import spaceAnimation from "../../../assets/animations/space.json";
import { useMusicStore } from "../../../store";
import ActionButton from "../../buttons/action";
import TextField from "../../text-field";
import Track from "../track";
import { PlaylistProps } from "./types";
import { service } from "../../../service";
import { isTokenExpired, isUnauthorizedError } from "../../../tools/auth";
import { isEvenNumber } from "../../../tools/math";

const Playlist = ({ name, tracks }: PlaylistProps) => {
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const playlistName = useMusicStore().playlistName;
  const renamePlaylist = useMusicStore().renamePlaylist;
  const clearPlaylist = useMusicStore().clearPlaylist;
  const isPlaylistEmpty = tracks.length === 0;
  const isPlaylistUntitled = playlistName === "";
  const isPlaylistIncomplete = isPlaylistEmpty || isPlaylistUntitled;

  const onRenamePlaylist = (name: string) => {
    setSaveError("");
    renamePlaylist(name);
  };

  const onClearName = () => {
    renamePlaylist("");
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
      <div className="Playlist-save">
        <TextField
          placeholder="Playlist Name"
          onChangeText={onRenamePlaylist}
          onClearText={onClearName}
          onSubmit={isPlaylistIncomplete ? undefined : onSavePlaylist}
          value={name}
          className={"playlist"}
        />
        <div className="Playlist-button">
          <ActionButton
            title="SAVE"
            onClick={onSavePlaylist}
            isDisabled={isPlaylistIncomplete}
            isLoading={isSaving}
            error={saveError}
          />
        </div>
      </div>
      {isPlaylistEmpty ? (
        <div className="Playlist-animation">
          <Lottie animationData={spaceAnimation} />
        </div>
      ) : (
        tracks.map((track, index) => (
          <Track
            key={track.id}
            track={track}
            isHighlighted={isEvenNumber(index)}
          />
        ))
      )}
    </div>
  );
};

export default Playlist;
