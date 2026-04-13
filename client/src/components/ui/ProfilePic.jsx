import pic from "../../assets/download.jfif";

export default function ProfilePic({ img = pic, width = 45, height = 45 }) {
  return (
    <img
      className="rounded-full"
      style={{ width: `${width}px`, height: `${height}px` }}
      src={img}
      alt="profile"
    />
  );
}
