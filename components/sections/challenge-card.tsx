import Link from "next/link";
import { ArrowRight, Building2, CalendarClock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatChallengeDeadline } from "@/lib/challenges";

export type ChallengeCardData = {
  slug: string;
  title: string;
  type: string;
  category: string;
  description: string;
  deadline: string | null;
  company: string;
};

/** Card da vitrine de desafios, usado em /desafios e no bloco de abertos em /empresas. */
export function ChallengeCard({ challenge, as = "h2" }: { challenge: ChallengeCardData; as?: "h2" | "h3" }) {
  const Heading = as;
  return (
    <Link
      href={`/desafios/${challenge.slug}`}
      className="surface-panel group flex flex-col rounded-lg p-5 transition-transform hover:-translate-y-1"
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <Badge variant="outline" className="border-orange-300/40 bg-orange-500/10 text-orange-300">
          {challenge.category}
        </Badge>
        <span className="text-xs font-semibold text-sky-300">{challenge.type}</span>
      </div>
      <Heading className="font-[var(--font-space)] text-lg font-bold text-white">{challenge.title}</Heading>
      <p className="mt-2 flex-1 text-sm leading-6 text-slate-300 line-clamp-3">{challenge.description}</p>
      <div className="mt-4 space-y-1 text-xs text-slate-400">
        <p className="flex items-center gap-1.5">
          <Building2 className="h-3.5 w-3.5 text-emerald-300" />
          <span className="truncate">{challenge.company}</span>
        </p>
        <p className="flex items-center gap-1.5">
          <CalendarClock className="h-3.5 w-3.5 text-orange-300" />
          {challenge.deadline ? `Propostas até ${formatChallengeDeadline(challenge.deadline)}` : "Fluxo contínuo"}
        </p>
      </div>
      <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-orange-300 group-hover:text-orange-200">
        Ver desafio
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
