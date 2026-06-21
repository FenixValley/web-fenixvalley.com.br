"use client";

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

export type MapActor = {
  id: number;
  slug: string | null;
  name: string;
  type: string;
  segment: string;
  neighborhood: string;
  description: string;
  site: string | null;
  lat: number;
  lng: number;
};

const BETIM_CENTER: [number, number] = [-44.1987, -19.9678];

export default function MapCanvas({
  actors,
  selectedId,
  onSelect
}: {
  actors: MapActor[];
  selectedId: number | null;
  onSelect: (id: number) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const map = new maplibregl.Map({
      container: containerRef.current,
      style: "https://tiles.openfreemap.org/styles/liberty",
      center: BETIM_CENTER,
      zoom: 12.2
    });
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");
    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = actors.map((actor) => {
      const element = document.createElement("button");
      element.type = "button";
      element.setAttribute("aria-label", actor.name);
      element.className =
        "h-4 w-4 cursor-pointer rounded-full border-2 border-white bg-orange-500 shadow-lg transition-transform hover:scale-125";
      element.addEventListener("click", () => onSelectRef.current(actor.id));
      return new maplibregl.Marker({ element }).setLngLat([actor.lng, actor.lat]).addTo(map);
    });
  }, [actors]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || selectedId === null) return;
    const actor = actors.find((item) => item.id === selectedId);
    if (actor) {
      map.flyTo({ center: [actor.lng, actor.lat], zoom: 14, duration: 700 });
    }
  }, [selectedId, actors]);

  return <div ref={containerRef} className="h-full w-full" />;
}
