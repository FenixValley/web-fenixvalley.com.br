"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Bookmark, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface MemberFavoriteItem {
  id: number;
  itemType: string;
  itemId: string;
  title: string;
  subtitle: string | null;
  link: string;
  createdAt: string;
}

const typeLabels: Record<string, string> = {
  opportunity: "Oportunidade",
  event: "Evento",
  challenge: "Desafio",
  content: "Conteúdo",
  actor: "Organização"
};

export function FavoriteList({ initialFavorites }: { initialFavorites: MemberFavoriteItem[] }) {
  const [favorites, setFavorites] = useState(initialFavorites);

  const handleRemove = async (id: number) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id));
    try {
      await fetch(`/api/favorites?id=${id}`, { method: "DELETE" });
    } catch {
      // Reverter se falhar
    }
  };

  if (favorites.length === 0) {
    return (
      <div className="surface-panel rounded-xl p-8 text-center space-y-3">
        <Bookmark className="mx-auto h-8 w-8 text-muted-foreground opacity-50" />
        <p className="text-base font-semibold text-foreground">Nenhum item salvo ainda</p>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Ao navegar pelas oportunidades, desafios e eventos do ecossistema, salve itens para acessá-los rapidamente aqui.
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <Button asChild size="sm" variant="outline" className="border-border">
            <Link href="/oportunidades">Ver oportunidades</Link>
          </Button>
          <Button asChild size="sm" variant="outline" className="border-border">
            <Link href="/desafios">Ver desafios</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {favorites.map((item) => (
        <div
          key={item.id}
          className="surface-panel flex flex-col justify-between rounded-xl p-5 space-y-4"
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-xs border-primary/40 bg-primary/10 text-primary">
                {typeLabels[item.itemType] ?? item.itemType}
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRemove(item.id)}
                className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                title="Remover dos salvos"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
            <h4 className="font-[var(--font-space)] text-base font-bold text-foreground">
              {item.title}
            </h4>
            {item.subtitle ? (
              <p className="text-xs text-muted-foreground line-clamp-2">{item.subtitle}</p>
            ) : null}
          </div>

          <Button asChild size="sm" className="w-full gap-2">
            <Link href={item.link}>
              Acessar
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      ))}
    </div>
  );
}
