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
      <Modal title={"Followings"} closeBtn={setFollowings}>
        {followings?.map((following, id) => (
          <div
            key={id}
            className="border-b border-light-border dark:border-dark-border "
          >
            <SearchCard
              user={following.following}
              setFollowings={setFollowings}
            />
          </div>
        ))}
      </Modal>
    </div>
  );
}
