import { useState } from "react";
import ActionButton from "../../buttons/action";
import Input from "../../input";
import Track from "../track";
import { PlaylistProps } from "./types";

const Playlist = ({ name, tracks }: PlaylistProps) => {
  return (
    <div className="Playlist">
      <Input
        placeholder="Playlist Name"
        onChangeText={(text) => console.log("playlist name", text)}
        value={name}
        style={{
          borderRadius: 0,
          borderWidth: 0,
          borderBottomWidth: 1,
          backgroundColor: "#f7f0ed",
        }}
      />
      {tracks.map((track) => (
        <Track
          key={track.id}
          album={track.album}
          artist={track.artist}
          title={track.title}
          artwork={track.artwork}
          year={track.year}
          status={track.status}
        />
      ))}
      <ActionButton
        title="SAVE TO SPOTIFY"
        onClick={() => console.log("save to spotify")}
      />
    </div>
  );
};

export default Playlist;
