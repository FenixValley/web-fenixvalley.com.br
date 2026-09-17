"use client";

import { useState } from "react";
import { Check, Copy, MessageCircle, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ShareButtons({ title, slug }: { title: string; slug: string }) {
  const [copied, setCopied] = useState(false);

  const getUrl = () => {
    if (typeof window !== "undefined") {
      return window.location.href;
    }
    return `https://fenixvalley.com.br/conteudos/${slug}`;
  };

  const shareOnWhatsApp = () => {
    const url = getUrl();
    const text = encodeURIComponent(`${title} - Leia no Fênix Valley: ${url}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank", "noopener,noreferrer");
  };

  const shareOnLinkedIn = () => {
    const url = encodeURIComponent(getUrl());
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank", "noopener,noreferrer");
  };

  const shareOnTwitter = () => {
    const url = encodeURIComponent(getUrl());
    const text = encodeURIComponent(title);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, "_blank", "noopener,noreferrer");
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(getUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback silencioso
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground mr-1">
        <Share2 className="h-3.5 w-3.5" /> Compartilhar:
      </span>
      <Button
        variant="outline"
        size="sm"
        onClick={shareOnWhatsApp}
        className="h-8 gap-1.5 text-xs border-border bg-card/60 hover:bg-muted"
      >
        <MessageCircle className="h-3.5 w-3.5 text-emerald-400" />
        WhatsApp
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={shareOnLinkedIn}
        className="h-8 gap-1.5 text-xs border-border bg-card/60 hover:bg-muted"
      >
        LinkedIn
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={shareOnTwitter}
        className="h-8 gap-1.5 text-xs border-border bg-card/60 hover:bg-muted"
      >
        X (Twitter)
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={copyLink}
        className="h-8 gap-1.5 text-xs border-border bg-card/60 hover:bg-muted"
      >
        {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
        {copied ? "Copiado!" : "Copiar link"}
      </Button>
    </div>
  );
}
