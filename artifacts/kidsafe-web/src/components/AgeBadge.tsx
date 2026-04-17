export function AgeBadge({ age }: { age: number }) {
  let label = "Toddler";
  let style = "bg-emerald-100 text-emerald-800 ring-emerald-200";
  if (age >= 13) { label = "Teen"; style = "bg-slate-800 text-white ring-slate-700"; }
  else if (age >= 9) { label = "Tween"; style = "bg-indigo-100 text-indigo-800 ring-indigo-200"; }
  else if (age >= 5) { label = "Kid"; style = "bg-amber-100 text-amber-800 ring-amber-200"; }
  return (
    <div className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider shadow-sm ring-1 ${style}`}>
      <span className="opacity-70">{label}</span>
      <span>{age}+</span>
    </div>
  );
}
