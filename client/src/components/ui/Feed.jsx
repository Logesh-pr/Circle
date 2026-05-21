export default function Feed({ children }) {
  return (
    <div className="py-5 flex flex-col-reverse items-center gap-y-3">
      {children}
    </div>
  );
}
