import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  LocalUser,
  RemoteUser,
  useIsConnected,
  useJoin,
  useLocalMicrophoneTrack,
  usePublish,
  useRemoteUsers,
} from "agora-rtc-react";

import Button from "../Button/Button";

import { AppDispatch } from "../../store/types";
import { deleteRoom, handleMembership } from "../../store/actions/singleRoomActions";
import { useState } from "react";

interface RoomControlsProps {
  isModerator: boolean;
  isMember: boolean;
  roomId: string;
  userId: string;
  token: string | null;
}

const RoomControls: React.FC<RoomControlsProps> = ({
  roomId,
  isModerator,
  isMember,
  userId,
  token,
}) => {
  const [calling, setCalling] = useState(isMember);
  useJoin(
    {
      appid: process.env.REACT_APP_AGORA_APP_ID as string,
      channel: "TalkTube",
      token:
        "007eJxTYChZ+rVujlP8c7aeEOsMBpnuF/t/hhSI791Rsn9LcNbUqG4FBiNDC3OzJANLiyQDQxMjo6SkVNPkRNNUU0MLMwtzoyTT1vW/0xoCGRk+KM5kZmSAQBCfgyEkMSc7pDQplYEBAON/IWs=", // TEMP TOKEN
      uid: userId,
    },
    calling
  );

  const [micOn, setMicOn] = useState(false);
  const isConnected = useIsConnected();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const remoteUsers = useRemoteUsers();
  const { localMicrophoneTrack } = useLocalMicrophoneTrack(isMember);
  let roomControls = null;

  usePublish([localMicrophoneTrack]);

  const handleDelete = async () => {
    await dispatch(deleteRoom(userId));
    navigate("/rooms");
  };

  const handleJoin = async () => {
    await dispatch(handleMembership({ userId, roomId, mode: "add" }));
    setCalling(true);
  };

  const handleLeave = async () => {
    await dispatch(handleMembership({ userId, roomId, mode: "remove" }));
    setCalling(false);
  };

  console.log(remoteUsers);

  if (isModerator) {
    roomControls = (
      <Button variant="secondary" size="sm" onClick={handleDelete}>
        Delete room
      </Button>
    );
  } else if (isMember) {
    roomControls = (
      <Button appearance="outline" size="sm" onClick={handleLeave}>
        Leave room
      </Button>
    );
  } else {
    roomControls = (
      <Button size="sm" onClick={handleJoin}>
        Join room
      </Button>
    );
  }

  return (
    <div className="flex gap-4 flex-wrap mb-6 p-5 py-4 rounded-3xl  bg-gray-800/50">
      {isMember && isConnected && (
        <>
          <Button onClick={() => setMicOn((micOn) => !micOn)}>
            {micOn ? "Mute" : "Unmute"}
          </Button>
          <LocalUser
            style={{ width: "60px", height: "60px" }}
            audioTrack={localMicrophoneTrack}
            micOn={micOn}
            cover="https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg"
          >
            <span className="text-white">You</span>
          </LocalUser>
          {remoteUsers.map((user) => (
            <div className="user" key={user.uid}>
              <RemoteUser
                cover="https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg"
                user={user}
              >
                <span className="text-white">{user.uid}</span>
              </RemoteUser>
            </div>
          ))}
        </>
      )}

      {roomControls}
    </div>
  );
};

export default RoomControls;
