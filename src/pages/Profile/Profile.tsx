import { useDispatch } from "react-redux";
import { signOutUserAction } from "../../store/actions/userActions";
import { Button } from "../../components";
import { AppDispatch } from "../../store/types";

const Profile = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = () => {
    dispatch(signOutUserAction());
  };

  return (
    <>
      <h1>Profile</h1>
      <Button onClick={handleClick}>Logout</Button>
    </>
  );
};

export default Profile;
