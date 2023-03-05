import React from "react";
import "./App.css";
import { ImageMap } from "@qiuz/react-image-map";
import Logo from "./assets/logo.png";
import { Gapless5 } from "@regosen/gapless-5";

import genreData from "./data/genres.json";
import trackData from "./data/tracks.json";
import mapData from "./data/maps.json";

const MUSIC_KEY = "music";

const NUMBERS = ["0️⃣", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"];

const MESSAGES = {
  disclaimer: (
    <div>
      <p dir="auto">
        Standard Business Professional Service Enterprise Multimedia Epress
        Deluxe Special Epansion Advanced Championship Edition Suite Version.5
        Build r23
      </p>
      <p dir="auto">
        This guide is a non-technical, irreverent critique of electronic dance
        music. Its purpose is to entertain before it informs. I suppose it could
        be used as a credited resource or educational primer, but that's not
        recommended since I made most of it up. Several biases here are
        celebrated lavishly, because downcasting people for their taste in music
        is close-minded. Ecept if their taste in music sucks.
      </p>
      <p dir="auto">
        DO NOT ask me for samples or mp3s. DO NOT send me samples or mp3s. DO
        NOT ask me where to get samples or mp3s. I will not send you any.
      </p>
      <p dir="auto">
        And no more emails please. If you want to bitch about the guide or
        discuss its merits and faults, do so on my web forum(
        <a href="http://www.ishkur.com/community" rel="nofollow">
          http://www.ishkur.com/community
        </a>
        ), and I or one of the people there will be sure to address your
        concerns in a polite and cordial manner.
      </p>
      <p dir="auto">
        <a href="http://www.ishkur.com" rel="nofollow">
          www.ishkur.com
        </a>
      </p>
    </div>
  ),
  credits: (
    <div>
      <p dir="auto">
        This guide, its construction, ideas, copy, design, layout, and
        everything else created by{" "}
        <a href="http://www.ishkur.com/" rel="nofollow">
          Ishkur
        </a>
        . Sound files, samples, and music are © the respective artists, and if
        they dare approach me with an army of lawyers crying about using their
        music I'll be forced to complain very vocally about them on my website.
        Seriously, you guys. You're getting free eposure here. Don't be a bunch
        of jerks over this.
      </p>
      <p dir="auto">
        Shoutouts to: Ari and the{" "}
        <a href="https://www.di.fm/" rel="nofollow">
          Digitally Imported
        </a>{" "}
        kru for being cool-ass mofos and hosting this behemoth of a bandwidth
        hog. Del and the{" "}
        <a href="http://www.tranceaddict.com/" rel="nofollow">
          Tranceaddicts
        </a>{" "}
        for being such good sports throughout all the tongue-in-cheek razzing.
      </p>
      <p dir="auto">
        Creative help to:
        <em>discogs.com</em>: the ultimate trainspotters resource
      </p>
      <p dir="auto">
        <em>allmusic.com</em>: the new version sucks, guys. And why haven't you
        established an "Electronic Music" category yet (and stop calling it
        Electronica!!!)! It's not 'New Age'. It's certainly bigger than that
        inbred trainwreck cracker twang that calls itself country. If you need
        help, I nominate myself as a creative consultant.
      </p>
      <p dir="auto">
        <em>Pretentious Elitists</em>: just shut the hell up, alright.
      </p>
      <p dir="auto">
        <em>Google</em>: what would the internet be like without Google?
        Anarchy, that's what.
      </p>
      <p dir="auto">
        <em>Maaz</em>: the non-North American perspective, and the map which
        inspired me to upgrade to a v2.0 in the first place. Than for the tips.
      </p>
    </div>
  ),
  home: (
    <p>
      This is a ported version of the original Ishkur's Guide to Electronic
      Music v2.5 which is designed to be working without Flash and be (semi)
      mobile-friendly. Credits for resources go to{" "}
      <a href="https://github.com/igorbrigadir/ishkurs-guide-dataset/">
        <code>ishkurs-guide-dataset</code>
      </a>
      , and of course Ishkur for creating this amazing guide (check out v3 of
      this guide <a href="http://music.ishkur.com/">here</a>).
    </p>
  ),
};

export default function App() {
  const [genre, setGenre] = React.useState();
  const [type, setType] = React.useState("music");
  const descriptionRef = React.useRef();
  const [message, setMessage] = React.useState();
  const playerRef = React.useRef();

  React.useEffect(() => {
    playerRef.current.player = new Gapless5({
      guiId: "gapless5-player-id",
      loop: true,
      singleMode: true,
      exclusive: true,
    });

    playerRef.current.player.addTrack(
      "/tracks/goatrance/SOUND/goatrance[0].m4a"
    );
  }, []);

  return (
    <div className="App-container">
      {/* <BackgroundEditor type="music" /> */}
      <Background
        type={type}
        setType={setType}
        genre={genre}
        setGenre={setGenre}
        descriptionRef={descriptionRef}
        setMessage={setMessage}
        onClick={() => playerRef.current.player.play()}
      />
      <div className="App-box" style={{ height: "100%" }}>
        <Description
          genre={genre}
          descriptionRef={descriptionRef}
          message={message}
        />

        <Audio genre={genre} player={playerRef?.current?.player} />
      </div>
      <div
        id="gapless5-player-id"
        ref={playerRef}
        style={{ display: "none" }}
      />
    </div>
  );
}

function Background({
  type,
  setType,
  genre,
  setGenre,
  descriptionRef,
  setMessage,
  onClick,
}) {
  const img = `/background/type_${type}.png`;

  const ImageMapComponent = React.useMemo(() => {
    const mapArea = mapData[type].concat(mapData[MUSIC_KEY]);

    mapArea.forEach((element, index) => {
      element.style = { cursor: "pointer" };
    });

    const onMapClick = (area, index) => {
      if (area.genre) {
        setGenre(area.genre);
        const areaType = genreData[area.genre].type.toLowerCase();
        if (areaType !== type) {
          setType(areaType);
        }
      } else if (area.type) {
        setType(area.type);
        setGenre(area.type);
      } else if (area.nav) {
        setType("music");
        setGenre(null);
        setMessage(MESSAGES[area.nav]);
      }

      descriptionRef.current.scrollTo(0, 0);
      onClick();
    };

    return (
      <ImageMap
        className="usage-map"
        src={img}
        map={mapArea}
        onMapClick={onMapClick}
      />
    );
  }, [type, genre, img, setGenre]);

  return (
    <div style={{ position: "relative", height: "fit-content", flex: "1 1" }}>
      {ImageMapComponent}
      <img
        src={Logo}
        style={{
          width: "41.40%",
          position: "absolute",
          top: "52.15%",
          left: "57.73%",
        }}
        alt=""
      />
    </div>
  );
}

function Description({ genre, descriptionRef, message }) {
  const title = genreData[genre]?.title;
  const aka = genreData[genre]?.aka;
  const description = genreData[genre]?.description;

  return (
    <div
      className="App-description"
      style={{
        flexDirection: "column",
        overflow: "auto",
        padding: "0.3em 1em",
      }}
      ref={descriptionRef}
    >
      {genre ? (
        <React.Fragment>
          <h1>{title}</h1>
          <h2>
            <small>{aka ? "aka " : null}</small>
            {aka}
          </h2>
          {description}
        </React.Fragment>
      ) : (
        message
      )}
    </div>
  );
}

function Audio({ genre, player }) {
  const tracks = trackData[genre] || [];
  const [currentTrack, setCurrentTrack] = React.useState();
  const ref = React.createRef();

  function selectTrack(track) {
    if (!player) {
      return;
    }

    if (track) {
      const src = `/tracks/${track.genre}/SOUND/${track.genre}[${track.index}].m4a`;

      player.removeAllTracks();
      player.addTrack(src);
      player.play();

      setCurrentTrack(track);
    } else {
      player.pause();
    }
  }

  React.useEffect(() => {
    if (tracks.length) {
      selectTrack(tracks[0]);
    } else {
      selectTrack(null);
    }
  }, [tracks]);

  return (
    <div className="App-audio" style={{ padding: "0 1em" }}>
      {/* <audio id="player" ref={ref} loop /> */}
      {/* <div id="gapless5-player-id" /> */}
      <div
        style={{
          display: "flex",
          alignContent: "center",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {" "}
          {tracks.map((track) => (
            <div
              style={{ fontSize: "2em", cursor: "pointer" }}
              onClick={() => selectTrack(track)}
              key={`${genre}${track.index}`}
            >
              {NUMBERS[track.index + 1]}
            </div>
          ))}
          {tracks.length ? (
            <div
              style={{ fontSize: "2em", cursor: "pointer" }}
              onClick={() => player.playpause()}
            >
              ⏯
            </div>
          ) : null}
        </div>
        {tracks.length ? (
          <h4>
            {currentTrack
              ? `${currentTrack.artist} - ${currentTrack.track}`
              : null}
          </h4>
        ) : null}
      </div>

      {/* <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignContent: "center",
        }}
      >
        {" "}
        {tracks.length ? <AudioButton playerRef={ref} /> : null}
      </div> */}
    </div>
  );
}

function playPause(playerRef) {
  playerRef.current.paused
    ? playerRef.current.play()
    : playerRef.current.pause();
}

// function AudioButton({ playerRef }) {
//   function playPause() {
//     playerRef.current.paused
//       ? playerRef.current.play()
//       : playerRef.current.pause();
//   }

//   return (
//     <img
//       onClick={() => playPause()}
//       style={{ cursor: "pointer", height: "100%", width: "100%" }}
//       src={PlayPauseIcon}
//       alt="Your SVG"
//     />
//   );
// }

function BackgroundEditor({ type }) {
  const img = `/background/type_${type}.png`;

  const ImageMapComponent = React.useMemo(() => {
    const mapArea = mapData[type];

    mapArea.forEach((element, index) => {
      element.style = { background: "rgba(255, 0, 0, 0.5)", cursor: "pointer" };
      element.id = index;
    });

    const onMapClick = (area, index) => {
      const res = prompt("?");
      area.genre = res;
      document.getElementById(index).style.background = "rgba(0, 255, 0, 0.5)";

      console.log(mapArea);
      console.log("remaining", mapArea.filter((x) => !x.genre).length);
    };

    return (
      <ImageMap
        className="usage-map"
        src={img}
        map={mapArea}
        onMapClick={onMapClick}
      />
    );
  }, [type]);

  return <div>{ImageMapComponent}</div>;
}
