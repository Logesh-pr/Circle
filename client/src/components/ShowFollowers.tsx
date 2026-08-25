//custom hooks
import { useGetFollowersQuery } from "../hooks/useUserQuery";

//components
import Modal from "./ui/Modal";
import SearchCard from "./ui/SearchCard";
import Loader from "./ui/Loader";

export default function ShowFollowers({ username, setFollowers }) {
  const { data: followers, isLoading } = useGetFollowersQuery(
    username,
    "followers",
  );

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div>
      <Modal title={"Followers"} closeBtn={setFollowers}>
        {followers?.map((followers, id) => (
          <div
            key={id}
            className="border-b border-light-border dark:border-dark-border "
          >
            <SearchCard
              key={id}
              user={followers.follower}
              setFollowers={setFollowers}
            />
          </div>
        ))}
      </Modal>
    </div>
  );
}
