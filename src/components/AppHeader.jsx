export default function AppHeader({ title, back, onBack, right }) {
  return (
    <div className="sticky top-0 z-50 bg-[var(--color-dark)] border-b border-white/10">
      <div className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          {back && (
            <button onClick={onBack} className="text-xl">
              ←
            </button>
          )}
          <h1 className="text-lg font-semibold">{title}</h1>
        </div>
        {right}
      </div>
    </div>
  );
}
