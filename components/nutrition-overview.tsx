import { Progress } from "@off/ui";
import type { OFFProduct } from "@/lib/types";

interface NutritionOverviewProps {
  product: OFFProduct;
}

interface MacroCardProps {
  label: string;
  value: number | undefined;
  unit: string;
  color: string;
  max: number;
  description?: string;
}

function MacroCard({ label, value, unit, color, max, description }: MacroCardProps) {
  const displayValue = value != null ? Math.round(value * 10) / 10 : null;
  const percent = value != null ? Math.min((value / max) * 100, 100) : 0;

  return (
    <div className="p-4 rounded-xl border border-zinc-200/60 bg-white space-y-3">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-zinc-500 font-medium uppercase tracking-wide">{label}</p>
          {description && <p className="text-xs text-zinc-400 mt-0.5">{description}</p>}
        </div>
        <div className="text-right">
          {displayValue != null ? (
            <>
              <span className="text-xl font-semibold text-zinc-900 tabular-nums">{displayValue}</span>
              <span className="text-xs text-zinc-400 ml-1">{unit}</span>
            </>
          ) : (
            <span className="text-sm text-zinc-400">—</span>
          )}
        </div>
      </div>
      <Progress
        value={percent}
        className="h-1.5"
        style={{ "--progress-color": color } as React.CSSProperties}
      />
      <p className="text-xs text-zinc-400">per 100g</p>
    </div>
  );
}

function CalorieRing({ calories }: { calories: number }) {
  const dailyTarget = 2000;
  const percent = Math.min((calories / dailyTarget) * 100, 100);
  const circumference = 2 * Math.PI * 40;
  const strokeDash = (percent / 100) * circumference;

  return (
    <div className="p-5 rounded-xl border border-zinc-200/60 bg-white flex items-center gap-5">
      <div className="relative w-24 h-24 shrink-0">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="8" className="text-zinc-200" />
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${strokeDash} ${circumference}`}
            className="text-orange-400 transition-all duration-700"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg font-bold tabular-nums">{Math.round(calories)}</span>
          <span className="text-xs text-zinc-400">kcal</span>
        </div>
      </div>
      <div className="space-y-1">
        <p className="font-semibold text-zinc-900">Calories</p>
        <p className="text-sm text-zinc-500">per 100g</p>
        <p className="text-xs text-zinc-400">
          {Math.round(percent)}% of {dailyTarget.toLocaleString()} kcal daily reference
        </p>
      </div>
    </div>
  );
}

export function NutritionOverview({ product }: NutritionOverviewProps) {
  const n = product.nutriments;
  if (!n) {
    return (
      <div className="text-center py-10 text-zinc-500">
        <p>Nutrition data not available for this product.</p>
      </div>
    );
  }

  const calories = n.energy_kcal_100g;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-zinc-400">All values per 100g unless noted</p>
      </div>

      {calories != null && <CalorieRing calories={calories} />}

      <div className="grid grid-cols-2 gap-3">
        <MacroCard label="Protein" value={n.proteins_100g} unit="g" color="#4ade80" max={30} description="Muscle & repair" />
        <MacroCard label="Carbs" value={n.carbohydrates_100g} unit="g" color="#60a5fa" max={100} description="Primary energy" />
        <MacroCard label="of which Sugars" value={n.sugars_100g} unit="g" color="#f97316" max={50} />
        <MacroCard label="Fat" value={n.fat_100g} unit="g" color="#a78bfa" max={50} />
        <MacroCard label="Saturated Fat" value={n.saturated_fat_100g} unit="g" color="#fb7185" max={20} />
        <MacroCard label="Fiber" value={n.fiber_100g} unit="g" color="#34d399" max={15} description="Digestive health" />
      </div>

      {(n.sodium_100g != null || n.salt_100g != null) && (
        <div className="grid grid-cols-2 gap-3">
          {n.sodium_100g != null && (
            <MacroCard label="Sodium" value={n.sodium_100g * 1000} unit="mg" color="#fbbf24" max={500} />
          )}
          {n.salt_100g != null && (
            <MacroCard label="Salt" value={n.salt_100g} unit="g" color="#94a3b8" max={3} />
          )}
        </div>
      )}
    </div>
  );
}
