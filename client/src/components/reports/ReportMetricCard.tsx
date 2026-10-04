import type { LucideIcon } from "lucide-react";

type ReportMetricCardProps = {
  label: string;
  value: string;
  icon: LucideIcon;
  tone: "blue" | "orange" | "green" | "navy";
};

const toneStyles = {
  blue: "bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300",
  orange: "bg-orange-50 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300",
  green: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300",
  navy: "bg-[#edf1f8] text-[#244e88] dark:bg-slate-800 dark:text-blue-200",
};

export default function ReportMetricCard({ label, value, icon: Icon, tone }: ReportMetricCardProps) {
  return (
    <article className="flex min-w-0 items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-5">
      <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-md ${toneStyles[tone]}`}>
        <Icon size={18} aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{label}</p>
        <p className="mt-1 truncate text-lg font-bold text-[#142e5c] dark:text-blue-100 sm:text-xl">{value}</p>
      </div>
    </article>
  );
}
