import { RoomCard, Spinner } from "../../components";
import { Room } from "../../types/global";

import blankImg from "../../assets/images/feeling-lonely.svg";

interface RoomsContainerProps {
  title: string;
  loading: boolean;
  rooms: Room[];
}

const RoomsContainer: React.FC<RoomsContainerProps> = ({ title, loading, rooms }) => {
  const blank = (
    <>
      <img
        className="block w-1/2 mx-auto mb-6"
        src={blankImg}
        alt="A sad woman sitting on the windowsill"
      />
      <h3 className="text-center">
        Here are no rooms yet. Why not create the first one?
      </h3>
    </>
  );

  if (loading) {
    return <Spinner className="absolute left-0 top-0 w-full h-full" size="lg" />;
  }

  if (rooms.length === 0) {
    return blank;
  }

  return (
    <>
      <h1 className="text-h2 mt-0">{title}</h1>
      <div className="grid lg:grid-cols-2 gap-2">
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </>
  );
};

export default RoomsContainer;
