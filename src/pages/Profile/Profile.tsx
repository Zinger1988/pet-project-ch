import { useDispatch } from "react-redux";
import { userSignOut } from "../../store/actions/userActions";
import { Button } from "../../components";
import { AppDispatch } from "../../store/types";

const Profile = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = () => {
    dispatch(userSignOut());
  };

  return (
    <>
      <h1>Profile</h1>
      <Button onClick={handleClick}>Logout</Button>
    </>
  );
};

export default Profile;
