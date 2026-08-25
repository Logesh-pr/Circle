export default function ProfilePic({ avator, width = 45, height = 45 }) {
  return (
    <img
      className="rounded-full object-cover"
      style={{ width: `${width}px`, height: `${height}px` }}
      src={avator}
      alt="profile"
    />
  );
}
