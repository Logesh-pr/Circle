export function Loader() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <svg
        width="24"
        height="24"
        viewBox="0 0 16 16"
        fill="none"
        style={{
          animation: "spin 0.8s linear infinite",
          color: "var(--color-text-tertiary)",
        }}
      >
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <circle
          cx="8"
          cy="8"
          r="6"
          stroke="currentColor"
          strokeOpacity="0.3"
          strokeWidth="2"
        />
        <path
          d="M14 8a6 6 0 0 0-6-6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
