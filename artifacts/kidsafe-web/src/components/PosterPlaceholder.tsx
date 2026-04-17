import { Sparkles } from "lucide-react";

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
      className={`relative w-full overflow-hidden flex flex-col items-center justify-center text-center text-white ${className}`}
      style={{ aspectRatio: aspect, background: `linear-gradient(135deg, ${a}, ${b})` }}
    >
      <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.1] mix-blend-overlay" />
      <div className="absolute inset-0 p-6 flex flex-col items-center justify-center z-10">
        <Sparkles className="mb-4 h-8 w-8 opacity-70" />
        <h3 className="font-serif text-xl md:text-2xl font-bold leading-tight line-clamp-4 drop-shadow-md">
          {title}
        </h3>
      </div>
    </div>
  );
}
