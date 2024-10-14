import Lottie from "lottie-react";
import { useState } from "react";

import micAnimation from "../../assets/animations/mic.json";
import Input from "../../components/input";
import Page from "../../components/page";
import { SearchScreenProps, Status, Tracks } from "./types";
import ActionButton from "../../components/buttons/action";

export const foundTracks = [
  {
    id: 1,
    title: "7. jookbox",
    album: "VGM.36",
    artist: "Knxwledge",
    artwork: "https://f4.bcbits.com/img/a3986641627_65",
    year: 2024,
    status: Status.ADDED,
  },
  {
    id: 2,
    title: "Time&Tide",
    album: "Hud Dreems",
    artist: "Knxwledge",
    artwork:
      "https://media.pitchfork.com/photos/5929adebb1335d7bf1699cb0/master/pass/728cea4f.jpg",
    year: 2015,
    status: Status.ADD,
  },
  {
    id: 3,
    title: "OpinyunGayme",
    album: "Anthology",
    artist: "Knxwledge",
    artwork: "https://f4.bcbits.com/img/a1100796245_65",
    year: 2013,
    status: Status.ADD,
  },
];
export const addedTracks = [
  {
    id: 1,
    title: "7. jookbox",
    album: "VGM.36",
    artist: "Knxwledge",
    artwork: "https://f4.bcbits.com/img/a3986641627_65",
    year: 2024,
    status: Status.REMOVE,
  },
];
export const playlistName = "Cool tunes";

const SearchScreen = (props: SearchScreenProps) => {
  const [text, setText] = useState("");
  const [found, setFound] = useState<Tracks>(foundTracks);
  const [added, setAdded] = useState<Tracks>(addedTracks);
  const [name, setName] = useState(playlistName);

  return (
    <Page>
      <Input
        placeholder="Artists, Albums, Songs, ..."
        onChangeText={(text) => setText(text)}
        value={text}
        isDisabled={false}
      />
      <div style={{ marginTop: 20 }}>
        <ActionButton
          title="SEARCH"
          onClick={() => console.log("search songs")}
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
