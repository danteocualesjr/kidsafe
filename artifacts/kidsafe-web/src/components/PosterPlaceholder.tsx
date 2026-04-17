const GRADIENTS = [
  ["#df6e53", "#f4a896"],
  ["#799e8a", "#b9d3c5"],
  ["#3a4a5d", "#7d92a8"],
  ["#b8854a", "#e6c590"],
  ["#5d6c8a", "#a3b1c9"],
  ["#8a5d6c", "#c98aa3"],
];

export function PosterPlaceholder({ title, seed = 0, aspect = "2/3", className = "" }: { title: string; seed?: number; aspect?: string; className?: string }) {
  const [a, b] = GRADIENTS[seed % GRADIENTS.length];
  return (
    <div
      className={`relative w-full overflow-hidden rounded-lg ${className}`}
      style={{ aspectRatio: aspect, background: `linear-gradient(135deg, ${a}, ${b})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      <div className="absolute inset-0 p-4 flex items-end">
        <div className="font-serif text-white text-lg font-bold leading-tight drop-shadow-lg">{title}</div>
      </div>
    </div>
  );
}
