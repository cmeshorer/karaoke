import { useKaraokeStore } from "../../../store";
import ActionButton from "../../buttons/action";
import Input from "../../input";
import Track from "../track";
import { PlaylistProps } from "./types";

const Playlist = ({ name, tracks }: PlaylistProps) => {
  const rename = useKaraokeStore().rename;

  return (
    <div className="Playlist">
      <Input
        placeholder="Playlist Name"
        onChangeText={(text) => rename(text)}
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
        onClick={() => console.log("save to spotify")}
        isDisabled={false}
        isLoading={false}
        isError={false}
      />
    </div>
  );
};

export default Playlist;
