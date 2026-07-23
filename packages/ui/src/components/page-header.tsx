export interface PageHeaderProps {
  heading: string;
  countryTag?: string;
  subtitle?: string;
}

export function PageHeader({ heading, countryTag, subtitle }: PageHeaderProps) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-semibold text-foreground tracking-tight">{heading}</h1>
        {countryTag && (
          <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-medium">
            {countryTag}
          </span>
        )}
      </div>
      {subtitle && (
        <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>
      )}
    </div>
  );
}
