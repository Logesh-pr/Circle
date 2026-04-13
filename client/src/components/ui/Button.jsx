export default function Button({ value, disabled, btnLogic }) {
  return (
    <button
      disabled={disabled}
      className={`w-full mt-6 py-2 rounded-lg bg-accent text-white font-semibold hover:bg-accent/70 transition-colors cursor-pointer ${btnLogic && "opacity-50 cursor-not-allowed"}`}
    >
      {value}
    </button>
  );
}
