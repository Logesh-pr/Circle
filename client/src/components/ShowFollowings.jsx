//custom hooks
import { Search } from "lucide-react";
import { useGetFollowingsQuery } from "../hooks/useUserQuery";

//components
import Modal from "./ui/Modal";
import SearchCard from "./ui/SearchCard";
import Loader from "./ui/Loader";

export default function ShowFollowings({ username, setFollowings }) {
  const { data: followings, isLoading } = useGetFollowingsQuery(
    username,
    "followings",
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <Modal closeBtn={setFollowings}>
        {followings?.map((following, id) => (
          <SearchCard
            user={following.following}
            setFollowings={setFollowings}
          />
        ))}
      </Modal>
    </div>
  );
}
