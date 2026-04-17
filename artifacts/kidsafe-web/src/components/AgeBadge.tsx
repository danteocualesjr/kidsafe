export function AgeBadge({ age, className = "" }: { age: number; className?: string }) {
  let label = "Toddler";
  let style = "bg-green-50 text-green-700 ring-green-200/50";
  if (age >= 13) { label = "Teen"; style = "bg-slate-100 text-slate-700 ring-slate-200/50"; }
  else if (age >= 9) { label = "Tween"; style = "bg-blue-50 text-blue-700 ring-blue-200/50"; }
  else if (age >= 5) { label = "Kid"; style = "bg-amber-50 text-amber-700 ring-amber-200/50"; }
  
  return (
    <div className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest shadow-sm ring-1 backdrop-blur-md ${style} ${className}`}>
      <span className="opacity-75">{label}</span>
      <span className="text-xs">{age}+</span>
    </div>
  );
}
