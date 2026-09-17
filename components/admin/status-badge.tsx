const styles: Record<string, string> = {
  pending: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  approved: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  rejected: "bg-rose-500/15 text-rose-400 border-rose-500/30",
  published: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  archived: "bg-slate-500/15 text-slate-400 border-slate-500/30",
  draft: "bg-slate-500/15 text-slate-400 border-slate-500/30"
};

const labelsM: Record<string, string> = {
  pending: "Pendente",
  approved: "Aprovado",
  rejected: "Rejeitado",
  published: "Publicado",
  archived: "Arquivado",
  draft: "Rascunho"
};

const labelsF: Record<string, string> = {
  pending: "Pendente",
  approved: "Aprovada",
  rejected: "Rejeitada",
  published: "Publicada",
  archived: "Arquivada",
  draft: "Rascunho"
};

export function StatusBadge({
  status,
  gender = "m"
}: {
  status: string;
  gender?: "m" | "f";
}) {
  const labelMap = gender === "f" ? labelsF : labelsM;
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${styles[status] ?? styles.archived}`}
    >
      {labelMap[status] ?? status}
    </span>
  );
}

