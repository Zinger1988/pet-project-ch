import CreateRoomForm from "../../components/CreateRoomForm/CreateRoomForm";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { CreateRoomValues } from "../../types/global";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/types";
import { createRoom } from "../../store/actions/roomsActions";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { сlearRoomsError } from "../../store/actions/roomsActions";
import { useNavigate } from "react-router-dom";

const CreateRoom = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.userSlice);
  const { loading, error } = useSelector((state: RootState) => state.roomsSlice);
  const { t } = useTranslation();

  useEffect(() => {
    if (error) {
      toast.error(t(error, { ns: "errors" }));
      dispatch(сlearRoomsError());
    }
  }, [error, dispatch, t]);

  const handleSumbit = async (values: CreateRoomValues) => {
    if (!user) return;
    await dispatch(createRoom({ ...values, createdBy: user.uid }));
    navigate("/rooms");
  };

  return (
    <section>
      <h2 className="mt-0">Create room</h2>
      <div>
        <CreateRoomForm onSubmit={handleSumbit} loading={loading} />
      </div>
    </section>
  );
};

export default CreateRoom;
