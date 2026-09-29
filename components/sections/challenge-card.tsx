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
        <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">
          {challenge.category}
        </Badge>
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{challenge.type}</span>
      </div>
      <Heading className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
        {challenge.title}
      </Heading>
      <p className="mt-2 flex-1 font-body text-sm leading-6 text-muted-foreground line-clamp-3">
        {challenge.description}
      </p>
      <div className="mt-4 space-y-1 font-body text-xs text-muted-foreground">
        <p className="flex items-center gap-1.5">
          <Building2 className="h-3.5 w-3.5 text-emerald-600" />
          <span className="truncate">{challenge.company}</span>
        </p>
        <p className="flex items-center gap-1.5">
          <CalendarClock className="h-3.5 w-3.5 text-primary" />
          {challenge.deadline ? `Propostas até ${formatChallengeDeadline(challenge.deadline)}` : "Fluxo contínuo"}
        </p>
      </div>
      <span className="mt-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-primary group-hover:underline">
        Ver desafio
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
