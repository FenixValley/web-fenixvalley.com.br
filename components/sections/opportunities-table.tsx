"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";
import { ArrowUpDown, ExternalLink, Search, Star } from "lucide-react";
import { Opportunity } from "@/data/opportunities";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

async function fetchOpportunities() {
  const response = await fetch("/api/opportunities");
  if (!response.ok) {
    throw new Error("Nao foi possivel carregar oportunidades.");
  }
  return (await response.json()) as Opportunity[];
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC"
  }).format(new Date(value));
}

function StageBadge({ stage }: { stage: string }) {
  const styles: Record<string, string> = {
    Aberto: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    Curadoria: "bg-sky-500/15 text-sky-400 border-sky-500/30",
    "Em breve": "bg-slate-500/15 text-slate-400 border-slate-500/30"
  };
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${styles[stage] ?? "bg-slate-500/15 text-slate-400 border-slate-500/30"}`}>
      {stage}
    </span>
  );
}

function TypeBadge({ type }: { type: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
      {type}
    </span>
  );
}

const WEEK_IN_MS = 7 * 24 * 60 * 60 * 1000;

function isClosingSoon(date: string) {
  const deadline = new Date(`${date}T23:59:59`).getTime();
  const now = Date.now();
  return deadline >= now && deadline - now <= WEEK_IN_MS;
}

export function OpportunitiesTable({ initialData }: { initialData: Opportunity[] }) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const { data = initialData, isFetching } = useQuery({
    queryKey: ["opportunities"],
    queryFn: fetchOpportunities,
    initialData,
    // initialData é o snapshot estático do build; busca a versão viva ao montar
    staleTime: 0
  });

  const columns = useMemo<ColumnDef<Opportunity>[]>(
    () => [
      {
        accessorKey: "title",
        header: ({ column }) => (
          <Button variant="ghost" size="sm" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-muted-foreground hover:text-foreground">
            Oportunidade
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => (
          <span className="inline-flex flex-wrap items-center gap-2">
            <span className="font-semibold text-foreground">{row.original.title}</span>
            {row.original.featured ? (
              <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/40 bg-amber-400/10 px-2 py-0.5 text-[11px] font-semibold text-amber-300">
                <Star className="h-3 w-3" />
                Destaque
              </span>
            ) : null}
          </span>
        )
      },
      {
        accessorKey: "type",
        header: () => <span className="text-muted-foreground text-xs font-bold uppercase tracking-wider">Tipo</span>,
        cell: ({ row }) => <TypeBadge type={row.original.type} />
      },
      {
        accessorKey: "stage",
        header: () => <span className="text-muted-foreground text-xs font-bold uppercase tracking-wider">Status</span>,
        cell: ({ row }) => <StageBadge stage={row.original.stage} />
      },
      {
        accessorKey: "audience",
        header: () => <span className="text-muted-foreground text-xs font-bold uppercase tracking-wider">Público</span>,
        cell: ({ row }) => <span className="text-muted-foreground text-sm">{row.original.audience}</span>
      },
      {
        accessorKey: "date",
        header: ({ column }) => (
          <Button variant="ghost" size="sm" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-muted-foreground hover:text-foreground">
            Data
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => (
          <span className="inline-flex flex-wrap items-center gap-2">
            <span className="text-muted-foreground text-sm">{formatDate(row.original.date)}</span>
            {isClosingSoon(row.original.date) ? (
              <span className="inline-flex items-center rounded-full border border-rose-400/40 bg-rose-400/10 px-2 py-0.5 text-[11px] font-semibold text-rose-300">
                Encerra em breve
              </span>
            ) : null}
          </span>
        )
      },
      {
        accessorKey: "owner",
        header: () => <span className="text-muted-foreground text-xs font-bold uppercase tracking-wider">Responsável</span>,
        cell: ({ row }) => <span className="text-muted-foreground text-sm">{row.original.owner}</span>
      },
      {
        id: "link",
        header: () => <span className="sr-only">Inscrição</span>,
        cell: ({ row }) =>
          row.original.link ? (
            <a
              href={row.original.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-sm font-bold text-primary hover:text-orange-400"
              aria-label={`Inscrever-se em ${row.original.title}`}
            >
              Inscrever
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          ) : null
      }
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel()
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-500" />
          <Input
            value={globalFilter}
            onChange={(event) => setGlobalFilter(event.target.value)}
            placeholder="Buscar por tema, público ou status"
            className="pl-9 bg-card/60 border-border text-foreground placeholder:text-muted-foreground focus:border-primary/40"
          />
        </div>
        <span className="text-sm text-muted-foreground">
          {isFetching ? "Atualizando..." : `${table.getRowModel().rows.length} itens`}
        </span>
      </div>
      <div className="rounded-xl border border-border bg-card/60 overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-border hover:bg-transparent">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="border-border">
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} className="border-border hover:bg-muted/5 transition-colors">
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
