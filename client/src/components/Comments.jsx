//components
import ProfilePic from "./ui/ProfilePic";

export default function Comments() {
  return (
    <>
      <div className="w-full flex items-start gap-x-2">
        <ProfilePic width={35} height={35} />
        <div>
          <div className="rounded-xl p-2 bg-slate-100 dark:bg-zinc-900 ">
            <p className="text-light-primary dark:text-dark-primary text-sm font-semibold">
              Kevin
            </p>
            <p className="text-xs text-light-secondary dark:text-dark-secondary">
              @kevin_ken
            </p>
            <p className="text-light-primary dark:text-dark-primary font-medium text-sm mt-2">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Asperiores animi obcaecati nostrum atque tenetur illum, similique
              voluptate fugiat provident deleniti.
            </p>
          </div>
          <div className="mt-1 text-xs">
            <p>2h ago</p>{" "}
          </div>
        </div>
      </div>
    </>
  );
}
