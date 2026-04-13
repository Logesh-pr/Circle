export default function Btn({ text }) {
  return (
    <button className="px-4 py-2 rounded-xl bg-accent hover:bg-accent/70 transition-colors cursor-pointer">
      {text}
    </button>
  );
}
