"use client";

import { useState } from "react";
import { Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FavoriteButtonProps {
  itemType: "opportunity" | "event" | "challenge" | "content" | "actor";
  itemId: string;
  title: string;
  subtitle?: string;
  link: string;
  initialFavorited?: boolean;
  className?: string;
}

export function FavoriteButton({
  itemType,
  itemId,
  title,
  subtitle,
  link,
  initialFavorited = false,
  className
}: FavoriteButtonProps) {
  const [favorited, setFavorited] = useState(initialFavorited);
  const [isPending, setIsPending] = useState(false);

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsPending(true);
    try {
      const res = await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemType, itemId, title, subtitle, link })
      });

      if (res.status === 401) {
        // Redireciona para login se não estiver logado
        window.location.href = `/login?callbackUrl=${encodeURIComponent(window.location.pathname)}`;
        return;
      }

      const data = (await res.json()) as { ok?: boolean; favorited?: boolean };
      if (data.ok) {
        setFavorited(Boolean(data.favorited));
      }
    } catch {
      // Fallback
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleToggle}
      disabled={isPending}
      className={cn(
        "h-8 gap-1.5 px-2.5 text-xs transition-colors",
        favorited
          ? "text-primary hover:text-primary hover:bg-primary/10"
          : "text-muted-foreground hover:text-foreground hover:bg-muted",
        className
      )}
      title={favorited ? "Remover dos salvos" : "Salvar na Área do Membro"}
      aria-label={favorited ? "Remover dos salvos" : "Salvar na Área do Membro"}
      aria-pressed={favorited}
    >
      <Bookmark className={cn("h-4 w-4", favorited && "fill-primary")} />
      <span>{favorited ? "Salvo" : "Salvar"}</span>
    </Button>
  );
}
