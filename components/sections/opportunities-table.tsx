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
import { ArrowUpDown, Search } from "lucide-react";
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
    <span className="inline-flex items-center rounded-full border border-orange-500/30 bg-orange-500/10 px-2.5 py-0.5 text-xs font-semibold text-orange-400">
      {type}
    </span>
  );
}

export function OpportunitiesTable({ initialData }: { initialData: Opportunity[] }) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const { data = initialData, isFetching } = useQuery({
    queryKey: ["opportunities"],
    queryFn: fetchOpportunities,
    initialData
  });

  const columns = useMemo<ColumnDef<Opportunity>[]>(
    () => [
      {
        accessorKey: "title",
        header: ({ column }) => (
          <Button variant="ghost" size="sm" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-slate-300 hover:text-white">
            Oportunidade
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => <span className="font-semibold text-white">{row.original.title}</span>
      },
      {
        accessorKey: "type",
        header: () => <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Tipo</span>,
        cell: ({ row }) => <TypeBadge type={row.original.type} />
      },
      {
        accessorKey: "stage",
        header: () => <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Status</span>,
        cell: ({ row }) => <StageBadge stage={row.original.stage} />
      },
      {
        accessorKey: "audience",
        header: () => <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Público</span>,
        cell: ({ row }) => <span className="text-slate-300 text-sm">{row.original.audience}</span>
      },
      {
        accessorKey: "date",
        header: ({ column }) => (
          <Button variant="ghost" size="sm" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-slate-300 hover:text-white">
            Data
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => <span className="text-slate-300 text-sm">{formatDate(row.original.date)}</span>
      },
      {
        accessorKey: "owner",
        header: () => <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Responsável</span>,
        cell: ({ row }) => <span className="text-slate-300 text-sm">{row.original.owner}</span>
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
            className="pl-9 bg-slate-900/60 border-white/10 text-white placeholder:text-slate-500 focus:border-orange-500/40"
          />
        </div>
        <span className="text-sm text-slate-400">
          {isFetching ? "Atualizando..." : `${table.getRowModel().rows.length} itens`}
        </span>
      </div>
      <div className="rounded-xl border border-white/10 bg-slate-900/60 overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-white/10 hover:bg-transparent">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="border-white/10">
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} className="border-white/10 hover:bg-white/5 transition-colors">
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