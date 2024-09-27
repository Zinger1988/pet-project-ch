import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Avatar, Button, Spinner } from "../../components";

import {
  clearRoomErrors,
  deleteRoom,
  getRoom,
  handleMembership,
} from "../../store/actions/singleRoomActions";
import { AppDispatch } from "../../store/types";
import { RootState } from "../../store";

const SingleRoom = () => {
  const { loading: userLoading, user } = useSelector(
    (state: RootState) => state.userSlice
  );
  const { loading, room, error } = useSelector(
    (state: RootState) => state.singleRoomSlice
  );
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getRoom(id as string));
  }, [id, dispatch]);

  useEffect(() => {
    if (error === "404") {
      dispatch(clearRoomErrors());
      navigate("/404", { replace: true });
    }
  }, [error, dispatch, navigate]);

  if (loading || userLoading || !room) {
    return <Spinner className="absolute left-0 top-0 w-full h-full" size="lg" />;
  }

  const isModerator = user!.uid === room!.moderator.id;
  const isMember = room.members.collection.some((member) => {
    return member.id === user!.uid;
  });

  const handleDelete = async () => {
    await dispatch(deleteRoom(id as string));
    navigate("/rooms");
  };

  const handleJoin = async () => {
    await dispatch(handleMembership({ userId: user!.uid, roomId: room.id, mode: "add" }));
  };

  const handleLeave = async () => {
    await dispatch(
      handleMembership({ userId: user!.uid, roomId: room.id, mode: "remove" })
    );
  };

  let roomControls = null;

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
    <article>
      <header className="grid grid-cols-[auto,1fr] gap-3 pb-4 mb-4 border-b border-gray-600">
        <Avatar name={room.moderator.name} className="col-span-1" size="xs" />
        <p className="my-0 font-medium">{room.moderator.name}</p>
        <h2 className="col-span-2 m-0">{room.name}</h2>
      </header>

      <div className="mb-6">
        <p>{room.description}</p>
      </div>
      <div className="flex gap-4 flex-wrap mb-6 p-5 py-4 rounded-3xl  bg-gray-800/50">
        {roomControls}
      </div>

      <div className="grid grid-cols-6 p-5 pt-7 border-2 border-gray-600 rounded-3xl">
        {room.members.collection.map((user: any) => (
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
