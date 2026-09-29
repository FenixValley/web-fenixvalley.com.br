const styles: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
  rejected: "bg-rose-50 text-rose-700 border-rose-200",
  published: "bg-emerald-50 text-emerald-700 border-emerald-200",
  archived: "bg-muted text-muted-foreground border-border",
  draft: "bg-muted text-muted-foreground border-border"
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
