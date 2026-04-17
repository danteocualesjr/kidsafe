export function AgeBadge({ age }: { age: number }) {
  let label = "Toddler";
  let style = "bg-emerald-100 text-emerald-800 ring-emerald-300/50";
  if (age >= 13) { label = "Teen"; style = "bg-slate-800 text-slate-100 ring-slate-700"; }
  else if (age >= 9) { label = "Tween"; style = "bg-indigo-100 text-indigo-800 ring-indigo-300/50"; }
  else if (age >= 5) { label = "Kid"; style = "bg-amber-100 text-amber-800 ring-amber-300/50"; }
  
  return (
    <div className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest shadow-sm ring-1 backdrop-blur-md ${style}`}>
      <span className="opacity-75">{label}</span>
      <span className="text-xs">{age}+</span>
    </div>
  );
}
