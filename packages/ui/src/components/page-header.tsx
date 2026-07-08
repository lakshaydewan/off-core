export interface PageHeaderProps {
  heading: string;
  countryTag?: string;
  subtitle?: string;
}

export function PageHeader({ heading, countryTag, subtitle }: PageHeaderProps) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-semibold text-zinc-900 tracking-tight">{heading}</h1>
        {countryTag && (
          <span className="px-2 py-0.5 rounded-full bg-[#FFA551]/20 text-[#C47A00] text-xs font-medium">
            {countryTag}
          </span>
        )}
      </div>
      {subtitle && (
        <p className="text-sm text-zinc-400 mt-0.5">{subtitle}</p>
      )}
    </div>
  );
}
