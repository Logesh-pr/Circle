//custom hooks
import { useGetFollowersQuery } from "../hooks/useUserQuery";

//components
import Modal from "./ui/Modal";

export default function ShowFollowers({ username, setFollowers }) {
  const { data } = useGetFollowersQuery(username, "followers");

  return (
    <div>
      <Modal closeBtn={setFollowers}></Modal>
    </div>
  );
}
