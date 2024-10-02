import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Avatar, RoomControls, Spinner } from "../../components";

import { clearRoomErrors, getRoom } from "../../store/actions/singleRoomActions";
import { AppDispatch } from "../../store/types";
import { RootState } from "../../store";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../firebase";

const SingleRoom = () => {
  const { user } = useSelector((state: RootState) => state.userSlice);
  const { loading, room, error } = useSelector(
    (state: RootState) => state.singleRoomSlice
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id = "" } = useParams();
  const [token, setToken] = useState(null);

  useEffect(() => {
    dispatch(getRoom(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (error === "404") {
      dispatch(clearRoomErrors());
      navigate("/404", { replace: true });
    }
  }, [error, dispatch, navigate]);

  useEffect(() => {
    const generateToken = async (roomId: string) => {
      const generateTokenFunction = httpsCallable(functions, "generateToken");
      try {
        const result: any = await generateTokenFunction({
          channelName: roomId,
          uid: 12345,
          expiryTime: 36000,
        });
        setToken(result.data);
      } catch (err) {
        console.error("Error generating token:", err);
        //setError(err.message);
      }
    };

    if (room) {
      generateToken(room.id);
    }
  }, [room]);

  if (loading || !token || !user || !room) {
    return <Spinner className="absolute left-0 top-0 w-full h-full" size="lg" />;
  }

  const { uid: userUid } = user;
  const { id: roomId, members, moderator, name: roomName, description } = room;
  const { id: moderatorId, name: moderatorName } = moderator;
  const { collection: membersCollection } = members;
  const isModerator = userUid === moderatorId;
  const isMember = membersCollection.some((member) => {
    return member.id === userUid;
  });

  return (
    <article>
      <header className="grid grid-cols-[auto,1fr] gap-3 pb-4 mb-4 border-b border-gray-600">
        <Avatar name={moderatorName} className="col-span-1" size="xs" />
        <p className="my-0 font-medium">{moderatorName}</p>
        <h2 className="col-span-2 m-0">{roomName}</h2>
      </header>

      <div className="mb-6">
        <p>{description}</p>
      </div>

      <RoomControls
        isModerator={isModerator}
        isMember={isMember}
        roomId={roomId}
        userId={userUid}
        token={token}
      />

      <div className="grid grid-cols-6 p-5 pt-7 border-2 border-gray-600 rounded-3xl">
        {membersCollection.map((user: any) => (
          <div key={user.email} className="flex flex-col gap-2 items-center">
            <Avatar name={user.name} className="col-span-1" size="xl" />
            <p className="text-center my-0 font-medium">{user.name}</p>
          </div>
        ))}
      </div>
    </article>
  );
};

export default SingleRoom;
