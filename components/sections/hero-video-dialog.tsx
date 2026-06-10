"use client";

import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

const placeholderUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ";

const videoUrl =
  process.env.NEXT_PUBLIC_HERO_VIDEO_URL ||
  (process.env.NODE_ENV === "development" ? placeholderUrl : "");

export function HeroVideoDialog() {
  if (!videoUrl) {
    return null;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="gap-2 text-white">
          <Play className="h-4 w-4" aria-hidden="true" />
          Assista ao vídeo institucional
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0">
        <DialogTitle className="sr-only">Vídeo institucional do Fênix Valley</DialogTitle>
        <div className="aspect-video w-full overflow-hidden rounded-lg">
          <iframe
            className="h-full w-full"
            src={videoUrl}
            title="Vídeo institucional do Fênix Valley"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
